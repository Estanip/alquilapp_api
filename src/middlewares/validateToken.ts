import jwt from "jsonwebtoken";
import { env } from "../../env";
import { ErrorResponse } from "./ErrorResponse";
import { IUser } from "../interfaces/User";
import { Response, Request, NextFunction } from "express";

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers.token as string;

    if (token) {
      jwt.verify(token, env.JWT_SECRET, (error: Error, user: IUser) => {
        if (user) {
          res.locals.user = user;
          next();
        }

        if (error) next(new ErrorResponse("Expired token", 401));
      });
    } else next(new ErrorResponse("Token validation error", 401));
  } catch (error) {
    throw new Error(error);
  }
};
