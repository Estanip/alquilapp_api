import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { comparePasswords, encryptPassword } from '../../../shared/utils/bcrypt.service';
import { IUserDocument } from '../interfaces/user.interface';
import { UserSchema } from './UserSchema';

export const userSchema = SchemaFactory.createForClass(UserSchema);

// Encrypt Password
userSchema.pre<IUserDocument>('save', async function (next: NextFunction) {
    if (!this.isModified('password')) return next();
    const encryptedPassword = encryptPassword(this.password);
    this.password = encryptedPassword;
});

// Compare Passwords
userSchema.methods.comparePasswords = function (password: string) {
    return comparePasswords(password, this.password);
};

userSchema.index({ email: 1 }, { unique: true });
