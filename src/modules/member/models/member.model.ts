import { Model, model } from 'mongoose';
import { MemberSchema } from '../schemas/member.schema';
import { IMemberDocument } from '../interfaces/member.interfaces';

export const MemberModel: Model<IMemberDocument> = model<IMemberDocument>(
    'Member',
    MemberSchema,
    'members',
);
