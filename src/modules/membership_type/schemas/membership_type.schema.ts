import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Error } from 'mongoose';
import { MembershipTypesSchema } from './MembershipTypes';

export const membershipTypesSchema = SchemaFactory.createForClass(MembershipTypesSchema);

// Validate type be unique
membershipTypesSchema.post('save', function (error: any, doc: any, next: NextFunction): void {
    if (error.name === 'MongoServerError' && error.code === 11000)
        return next(new Error('Type must be unique'));
    else return next(error);
});
