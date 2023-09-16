import { ErrorResponse } from '../middlewares/ErrorResponse';
import { NextFunction, Request, Response } from 'express';
import User from '../models/User';
import { IUser, UserLoginResponse } from '../interfaces/User';
import { CREATED, FORBIDDEN, INTERNAL_SERVER_ERROR, NOT_FOUND, SUCCESS } from '../constants/responseStatusCode';

export class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await new User(req.body).save();

      return res.status(CREATED).send({
        success: true,
        message: 'User created succesfully',
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, INTERNAL_SERVER_ERROR));
    }
  };

  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;

      const user: IUser = await User.findOne({ email }).exec();

      if (!user) return next(new ErrorResponse('Invalidate credentials', NOT_FOUND));

      const validatePassword: boolean = user.comparePasswords(password);

      if (!validatePassword) return next(new ErrorResponse('Incorrect password', FORBIDDEN));

      const token: string = user.generateToken(user);
      const userInfo = {
        id: user._id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        identification_number: user.identification_number,
        member_status: user.member_status,
      } as UserLoginResponse;
      return res.status(SUCCESS).send({
        success: true,
        message: 'Login succesfully',
        token,
        user: userInfo,
      });
    } catch (error) {
      return next(new ErrorResponse(error.message, INTERNAL_SERVER_ERROR));
    }
  };
}
