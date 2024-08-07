import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import morgan, { StreamOptions } from 'morgan';
import { LoggerService } from '../utils/logger/logger.service';

@Injectable()
export class MorganMiddleware implements NestMiddleware {
  constructor(private _logger: LoggerService) {}

  use(req: Request, res: Response, next: NextFunction) {
    // Get & set service name from url
    let serviceName = req.baseUrl ? req.baseUrl.replace('/', '').toUpperCase() : '';
    serviceName = serviceName.split('').includes('/') ? serviceName.split('/')[0] : serviceName;

    // Create a logger from service name
    this._logger = new LoggerService(`HTTP-${serviceName}`);

    // Set output message using logger
    const stream: StreamOptions = {
      write: message => this._logger.log(message.trim()),
    };
    // Set skip condition
    const skip = () => false;

    // Run morgan
    const morganMiddleware = morgan(':method :url :status - :response-time ms', {
      stream,
      skip,
    });
    morganMiddleware(req, res, next);
  }
}
