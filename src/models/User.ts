import { NextFunction } from "express";
import { IUser } from "../interfaces/User";
import { Schema, model } from "mongoose";
import { comparePasswords, encryptPassword } from "../utils/bcrypt";
import { generateToken } from "../utils/jwt";

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
    //select: false,
  },
});

UserSchema.pre<IUser>("save", async function (next: NextFunction) {
  if (!this.isModified("password")) return next();

  const encryptedPassword = encryptPassword(this.password);
  this.password = encryptedPassword;
});

UserSchema.methods.comparePasswords = function (password: string) {
  return comparePasswords(password, this.password);
};

UserSchema.methods.generateToken = function (user: IUser) {
  return generateToken(user);
};

export default model<IUser>("User", UserSchema);
