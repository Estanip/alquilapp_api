import { IErrorObject } from 'interfaces/ErrorResponse';
import { INTERNAL_SERVER_ERROR } from '../constants/responseStatusCode';
import { NextFunction, Request, Response } from 'express';

export class ErrorResponse extends Error {
    private statusCode: number;

    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
    }
}

export const returnErroResponse = (
    err: IErrorObject,
    req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    next: NextFunction,
) => {
    res.status(err.statusCode || INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message || 'Internal Server Error',
        error: err,
    });
};
