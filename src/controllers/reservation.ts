import Reservation from '../models/Reservation';
import { ErrorResponse } from '../middlewares/ErrorResponse';
import { NextFunction, Request, Response } from 'express';
import { CREATED, INTERNAL_SERVER_ERROR } from '../constants/responseStatusCode';

export class ReservationController {
    createReservation = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await new Reservation(req.body).save();

            return res.status(CREATED).send({ success: true, message: 'Created' });
        } catch (error) {
            return next(new ErrorResponse(error, INTERNAL_SERVER_ERROR));
        }
    };
}
