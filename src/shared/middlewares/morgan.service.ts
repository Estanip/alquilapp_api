import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import { ENVIRONMENTS } from '../Config/config.interfaces';
import { CONFIG } from '../Config/configuration';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
    constructor(private _logger: LoggerService) {}

    use(req: Request, res: Response, next: () => void) {
        let serviceName = req.baseUrl ? req.baseUrl.replace('/', '').toUpperCase() : '';
        serviceName = serviceName.split('').includes('/') ? serviceName.split('/')[0] : serviceName;
        this._logger = new LoggerService(`HTTP-${serviceName}`);
        const stream: StreamOptions = {
            write: (message) => this._logger.log(message.trim()),
        };
        const skip = () => CONFIG.env !== ENVIRONMENTS.DEV;
        morgan(':method :url :status - :response-time ms', {
            stream,
            skip,
        })(req, res, next);
    }
}
