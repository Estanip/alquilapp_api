import { BadRequestException } from '@nestjs/common';
import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
    try {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    } catch (error) {
        throw new BadRequestException(error);
    }
};

export const comparePasswords = (currentPassword: string, userPassword: string) => {
    try {
        return bcrypt.compareSync(currentPassword, userPassword);
    } catch (error) {
        throw new BadRequestException(error);
    }
};
