import Reservation from "../models/Reservation";
import { IReservation } from "../interfaces/Reservation";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export class ReservationController {
  public async createReservation(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      await new Reservation(req.body).save();

      return res.status(201).send({ success: true, message: "Created" });
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  }
}
