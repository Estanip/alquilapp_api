import { Prop, Schema } from '@nestjs/mongoose';
import { CourtNumbers } from 'src/modules/court/entities/court.entity';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { PlayerSchema } from './PlayerSchema';

@Schema({ versionKey: false, timestamps: true })
export class ReservationSchema extends AbstractDocument {
    @Prop({
        type: Date,
        required: [true, 'date field cannot be empty'],
    })
    date: Date;

    @Prop({
        type: String,
        required: [true, 'From field cannot be empty'],
    })
    from: string;

    @Prop({
        type: String,
        required: [true, 'To field cannot be empty'],
    })
    to: string;

    @Prop({
        type: Number,
        enum: CourtNumbers,
        min: 0,
        max: 5,
        required: [true, 'Court field cannot be empty'],
    })
    court: number;

    @Prop({ type: Number })
    total_price: number;

    @Prop([
        {
            type: PlayerSchema,
            required: [true, 'Players field cannot be empty'],
        },
    ])
    players: PlayerSchema[];
}
