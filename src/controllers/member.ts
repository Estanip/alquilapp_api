import Member from "../models/Member";
import { IMember } from "../interfaces/Member";
import { ErrorResponse } from "../middlewares/ErrorResponse";
import { NextFunction, Request, Response } from "express";

export class MemberController {
  public async getMembers(req: Request, res: Response, next: NextFunction) {
    try {
      const members: IMember[] = await Member.find().exec();

      return res.status(200).send(members);
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  }

  public async getMembersBy(req: Request, res: Response, next: NextFunction) {
    try {
      const members: IMember[] = await Member.find(req.query).exec();

      return res.status(200).send(members);
    } catch (error) {
      return next(new ErrorResponse(error, 500));
    }
  }
}
