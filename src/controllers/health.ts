import { ErrorResponse } from '../middlewares/ErrorResponse';
import { NextFunction, Request, Response } from 'express';
import { INTERNAL_SERVER_ERROR, SUCCESS } from '../constants/responseStatusCode';

export class HealthController {
    checkHealth = async (req: Request, res: Response, next: NextFunction) => {
        try {
            return res.status(SUCCESS).send({ success: true, message: 'Healthy' });
        } catch (error) {
            return next(new ErrorResponse(error, INTERNAL_SERVER_ERROR));
        }
    };
}
