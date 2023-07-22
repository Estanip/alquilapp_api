import { IUser } from "interfaces/User";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      await new User(req.body).save();

      return res.status(201).send({
        success: true,
        message: "User created succesfully",
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  }
}
