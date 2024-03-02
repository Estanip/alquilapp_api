import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';
import { IExceptionResponse } from '../interfaces';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse() as IExceptionResponse;
        const exceptionResponseDetails = exceptionResponse?.message;

        response.status(status).json({
            success: false,
            statusCode: status,
            message: exceptionResponseDetails,
            timestamp: new Date().toISOString(),
            path: request.url,
            data: null,
        });
    }
}
