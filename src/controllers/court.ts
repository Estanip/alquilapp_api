import Court from "../models/Court";
import { ICourt } from "../interfaces/Court";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export class CourtController {
  public async getCourts(req: Request, res: Response, next: NextFunction) {
    try {
      const courts: ICourt[] = await Court.find().exec();

      return res.status(200).send(courts);
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  }
}
