import { Document } from "mongoose";

export interface ICourt extends Document {
  available_from: string;
  available_until: string;
  type: string;
  number: number;
  status: string;
}
