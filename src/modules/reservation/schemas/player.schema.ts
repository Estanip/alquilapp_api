import { Schema, Types } from 'mongoose';

export const PLayerSchema: Schema = new Schema(
    {
        user: {
            type: Types.ObjectId,
            ref: 'User',
            unique: true,
            required: [true, 'user field cannot be empty'],
        },
        fee: Number,
    },
    {
        timestamps: false,
        versionKey: false,
        _id: false,
    },
);
