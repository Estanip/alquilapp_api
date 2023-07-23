import { IUserType } from "interfaces/UserType";
import { Schema, model } from "mongoose";

const UserTypeSchema: Schema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: String,
      enum: ["enabled", "disabled"],
      default: "enabled",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IUserType>("UserType", UserTypeSchema);
