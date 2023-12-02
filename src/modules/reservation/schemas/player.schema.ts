import { Schema, Types } from 'mongoose';

export const PLayerSchema: Schema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            required: [true, 'user field cannot be empty'],
        },
        fee: {
            type: Number,
            required: [true, 'fee field cannot be empty'],
        },
    },
    {
        timestamps: false,
        versionKey: false,
        _id: false,
    },
);
