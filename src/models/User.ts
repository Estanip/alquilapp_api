import { NextFunction } from "express";
import { IUser } from "../interfaces/User";
import { Schema, model } from "mongoose";
import { encryptPassword } from "../utils/bcrypt";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    lowercase: true,
    required: [true, "Email field cannot be empty"],
    match: [
      /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
      "Please insert a valid email format",
    ],
    unique: true,
    index: true,
  },
  password: {
    type: String,
    required: [true, "Password field cannot be empty"],
    minlength: [8, "Please use minimum of 8 characters"],
    select: false,
  },
});

UserSchema.pre<IUser>("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  const encryptedPassword = encryptPassword(this.password);
  this.password = encryptedPassword;
});

export default model<IUser>("User", UserSchema);
