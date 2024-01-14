import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from '../utils/logger.service';
import { Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import 'dotenv/config';
const { ENVIRONMENT } = process.env;

@Injectable()
export class MorganMiddleware implements NestMiddleware {
    private logger: LoggerService;

    use(req: Request, res: Response, next: () => void) {
        const serviceName = req.baseUrl ? req.baseUrl.replace('/', '').toUpperCase() : '';
        this.logger = new LoggerService(`HTTP-${serviceName}`);
        const stream: StreamOptions = {
            write: (message) => this.logger.log(message.trim()),
        };

        const skip = () => ENVIRONMENT !== 'development';

        morgan(':method :url :status - :response-time ms', {
            stream,
            skip,
        })(req, res, next);
    }
}
