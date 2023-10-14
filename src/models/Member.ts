import { IMember } from '../interfaces/Member';
import { Schema, model } from 'mongoose';

const MemberSchema: Schema = new Schema(
    {
        first_name: { type: String },
        last_name: { type: String },
        email: { type: String },
        phone_number: { type: String },
        identification_number: { type: String },
        status: { type: String },
        birth_date: { type: Date },
        type: { type: String },
    },
    {
        collation: { locale: 'en', strength: 2 },
    },
);

export default model<IMember>('Member', MemberSchema);
