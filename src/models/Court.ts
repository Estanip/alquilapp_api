import { ICourt } from 'interfaces/Court';
import { Schema, model } from 'mongoose';

const CourtSchema: Schema = new Schema({
    type: { type: String },
    number: { type: Number },
    status: { type: String, enum: ['enabled', 'disabled'] },
    available_from: { type: String },
    available_until: { type: String },
});

export default model<ICourt>('Court', CourtSchema);
