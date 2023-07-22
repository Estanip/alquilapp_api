import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
        
      return next(new ErrorResponse("cccca 3000", 401));
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  }
}
