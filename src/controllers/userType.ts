import { NextFunction } from "connect";
import { Request, Response } from "express";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import UserType from "../models/UserType";

export class UserTypeController {
  createUserType = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new UserType(req.body).save();

      return res.status(201).send({ success: true, message: "Created" });
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  };
}
