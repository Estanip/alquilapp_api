import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../interfaces/User";
import {
  CREATED,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  SUCCESS,
} from "../constants/responseStatus";

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new User(req.body).save();

      return res.status(CREATED).send({
        success: true,
        message: "User created succesfully",
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, INTERNAL_SERVER_ERROR));
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user: IUser = await User.findOne({ email }).exec();

      if (!user)
        return next(new ErrorResponse("User does not exists", NOT_FOUND));

      const validatePassword: boolean = user.comparePasswords(password);

      if (!validatePassword)
        return next(new ErrorResponse("Incorrect password", FORBIDDEN));

      const token: string = user.generateToken(user);
      return res
        .status(SUCCESS)
        .send({ success: true, message: "Login succesfully", token });
    } catch (error) {
      return next(new ErrorResponse(error.message, INTERNAL_SERVER_ERROR));
    }
  };
}
