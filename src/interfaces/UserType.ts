import { Document } from "mongoose";

export interface IUserType extends Document {
  name: string;
  status: string;
}
