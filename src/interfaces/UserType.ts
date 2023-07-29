import { Document } from "mongoose";

export interface IUserType extends Document {
  name: string;
  status: string;
}

export type UserTypeStatus = Pick<IUserType, "status">;
export type UserTypeName = Pick<IUserType, "name">;
