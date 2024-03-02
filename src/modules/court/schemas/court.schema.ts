import { SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { IMongooseError } from 'src/shared/interfaces';
import { CourtSchema } from './CourtSchema';

export const courtSchema = SchemaFactory.createForClass(CourtSchema);

// Validate court number be unique
courtSchema.post('save', function (error: IMongooseError, doc: Document, next: NextFunction): void {
    if (error.name === 'MongoServerError' && error.code === 11000)
        return next(new Error('Court must be unique'));
    else return next(error);
});
