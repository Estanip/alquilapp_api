import Court from "../models/Court";
import { ICourt } from "../interfaces/Court";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import { INTERNAL_SERVER_ERROR, SUCCESS } from "../constants/responseStatus";

export class CourtController {
  getCourts = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const courts: ICourt[] = await Court.find().exec();

      return res.status(SUCCESS).send(courts);
    } catch (error) {
      return next(new ErrorResponse(error, INTERNAL_SERVER_ERROR));
    }
  };
}
