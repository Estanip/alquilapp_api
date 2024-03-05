import { Prop, Schema } from '@nestjs/mongoose';
import { CourtNumbers } from 'src/modules/court/interfaces/court.interfaces';
import { MembershipTypes } from 'src/modules/member/interfaces/member.interfaces';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { CurrencyTypes } from '../interfaces/pricing.interfaces';

@Schema({ versionKey: false, timestamps: true })
export class PricingSchema extends AbstractDocument {
    @Prop({
        type: String,
        enum: MembershipTypes,
        required: [true, 'Membership Type field cannot be empty'],
    })
    membership_type: MembershipTypes;

    @Prop({ type: Number, enum: CourtNumbers, required: [true, 'Court field cannot be empty'] })
    court: CourtNumbers;

    @Prop({ type: String, default: CurrencyTypes.PESOS_ARG })
    currency: CurrencyTypes.PESOS_ARG;

    @Prop({ type: Number, min: 0, required: true })
    price: number;

    @Prop({ type: Date, required: true })
    validate_until: Date;
}
