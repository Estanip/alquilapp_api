import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, HydratedDocument } from 'mongoose';
import { MembershipTypes } from 'src/modules/member/interfaces';
import { comparePasswords, encryptPassword } from '../../../shared/utils/bcrypt.service';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false, timestamps: true })
export class User extends Document {
  @Prop({
    type: String,
    lowercase: true,
    required: [true, 'Email field cannot be empty'],
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Please insert a valid email format'],
    unique: true,
    index: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Password field cannot be empty'],
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
      'Please insert a valid password format (1 letter, 1 number & 1 upperCase)',
    ],
    minlength: [8, 'Please use minimum of 8 characters'],
  })
  password: string;

  @Prop({
    type: String,
    required: [true, 'First Name field cannot be empty'],
  })
  first_name: string;

  @Prop({
    type: String,
    required: [true, 'Last Name field cannot be empty'],
  })
  last_name: string;

  @Prop({ type: String })
  phone_number: string;

  @Prop({
    type: String,
    required: [true, 'Identification number field cannot be empty'],
    minlength: [7, 'Idenfitication number must have at least 7 characters'],
    maxLength: [8, 'Idenfitication number cannot be longer than 8 characters'],
    unique: true,
  })
  identification_number: string;

  @Prop({
    type: String,
    required: [true, 'Date of birth cannot be empty'],
  })
  birth_date: string;

  @Prop({
    type: String,
    enum: MembershipTypes,
    required: [true, 'Membership Type field cannot be empty'],
  })
  membership_type: MembershipTypes;

  @Prop({
    type: Boolean,
    default: false,
  })
  is_membership_validated: boolean;

  @Prop({ type: Boolean, default: false })
  is_enabled: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

// Encrypt Password
UserSchema.pre<UserDocument>('save', async function (next: NextFunction) {
  if (!this.isModified('password')) return next();
  const encryptedPassword = encryptPassword(this.password);
  this.password = encryptedPassword;
});

// Compare Passwords
UserSchema.methods.comparePasswords = function (password: string) {
  return comparePasswords(password, this.password);
};

UserSchema.index({ email: 1 }, { unique: true });
