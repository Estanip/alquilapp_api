import { Model, model } from 'mongoose';
import { CourtSchema } from '../schemas/court.schema';
import { ICourtDocument } from '../interfaces/court.interfaces';

export const CourtModel: Model<ICourtDocument> = model<ICourtDocument>(
    'Court',
    CourtSchema,
    'courts',
);
