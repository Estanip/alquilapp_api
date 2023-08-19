import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import { IUser } from "../interfaces/User";

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new User(req.body).save();

      return res.status(201).send({
        success: true,
        message: "User created succesfully",
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user: IUser = await User.findOne({ email }).exec();

      if (!user) return next(new ErrorResponse("User does not exists", 404));

      const validatePassword: boolean = user.comparePasswords(password);

      if (!validatePassword)
        return next(new ErrorResponse("Incorrect password", 403));

      const token: string = user.generateToken(user);
      return res
        .status(200)
        .send({ success: true, message: "Login succesfully", token });
    } catch (error) {
      return next(new ErrorResponse(error.message, 500));
    }
  };
}
