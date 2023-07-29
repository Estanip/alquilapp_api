import { Document } from "mongoose";

export interface IMember extends Document {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  status: string;
  birth_date: Date;
  type: string;
};
