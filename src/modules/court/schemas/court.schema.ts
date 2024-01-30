import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { CourtSchema } from './CourtSchema';

export const courtSchema = SchemaFactory.createForClass(CourtSchema);

// Validate court number be unique
courtSchema.post('save', function (error: any, doc: any, next: NextFunction): void {
    if (error.name === 'MongoServerError' && error.code === 11000)
        return next(new Error('Court number must be unique'));
    else return next(error);
});
