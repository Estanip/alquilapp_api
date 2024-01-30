import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
    constructor(
        private readonly configService: ConfigService,
        private _logger: LoggerService,
    ) {}

    use(req: Request, res: Response, next: () => void) {
        let serviceName = req.baseUrl ? req.baseUrl.replace('/', '').toUpperCase() : '';
        serviceName = serviceName.split('').includes('/') ? serviceName.split('/')[0] : serviceName;
        this._logger = new LoggerService(`HTTP-${serviceName}`);
        const stream: StreamOptions = {
            write: (message) => this._logger.log(message.trim()),
        };
        const skip = () => this.configService.get('env') !== 'development';
        morgan(':method :url :status - :response-time ms', {
            stream,
            skip,
        })(req, res, next);
    }
}
