import { Document } from "mongoose";

export interface ICourt extends Document {
  type: string;
  number: number;
  status: string;
}
