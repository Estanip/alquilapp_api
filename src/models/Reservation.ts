import { IReservation } from '../interfaces/Reservation';
import { Schema, model } from 'mongoose';

const ReservationSchema: Schema = new Schema(
    {
        day: {
            type: Date,
            required: [true, 'Day field cannot be empty'],
        },
        from: {
            type: String,
            required: [true, 'From field cannot be empty'],
        },
        to: {
            type: String,
            required: [true, 'To field cannot be empty'],
        },
        court: {
            type: Schema.Types.ObjectId,
            ref: 'Court',
            required: [true, 'Court field cannot be empty'],
        },
        players: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
                required: [true, 'Players field cannot be empty'],
            },
        ],
        total_price: {
            type: Number,
            required: [true, 'Total price field cannot be empty'],
        },
    },
    {
        timestamps: true,
    },
);

export default model<IReservation>('Reservation', ReservationSchema);
