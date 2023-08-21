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
    if (req?.url?.includes("/api-docs/")) return next();
    else if (req?.url != "/api-docs/") {
      const token = req.headers.authorization as string;

      if (token) {
        jwt.verify(token, env.JWT_SECRET, (error: Error, user: IUser) => {
          if (user) {
            res.locals.user = user;
            next();
          }

          if (error) next(new ErrorResponse("Expired token", 401));
        });
      } else next(new ErrorResponse("Token validation error", 401));
    }
  } catch (error) {
    throw new Error(error);
  }
};
