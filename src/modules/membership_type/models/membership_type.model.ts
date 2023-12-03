import { IMembershipTypeDocument } from '../interfaces/membership_type.interfaces';
import { MembershipTypeSchema } from '../schemas/membership_type.schema';
import { Model, model } from 'mongoose';

export const MembershipTypeModel: Model<IMembershipTypeDocument> = model<IMembershipTypeDocument>(
    'MembershipType',
    MembershipTypeSchema,
    'membership_types',
);
