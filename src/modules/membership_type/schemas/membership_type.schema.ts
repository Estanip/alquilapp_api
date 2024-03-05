import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, Error } from 'mongoose';
import { IMongooseError } from 'src/shared/interfaces';
import { MembershipTypesSchema } from './MembershipTypes';

export const membershipTypesSchema = SchemaFactory.createForClass(MembershipTypesSchema);

// Validate type be unique
membershipTypesSchema.post(
    'save',
    function (error: IMongooseError, doc: Document, next: NextFunction): void {
        if (error.name === 'MongoServerError' && error.code === 11000)
            return next(new Error('Type must be unique'));
        else return next(error);
    },
);
