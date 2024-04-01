import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { NextFunction } from 'express';
import { Document, Error } from 'mongoose';
import { MembershipTypes } from 'src/modules/member/interfaces';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { IMongooseError } from 'src/shared/interfaces';

@Schema({ versionKey: false, timestamps: true })
export class MembershipTypesSchema extends AbstractDocument {
    @Prop({ type: String, required: true, unique: true, enum: MembershipTypes })
    type: string;

    @Prop({ type: String })
    description: string;

    @Prop({ type: Boolean, default: true })
    is_enabled: boolean;
}

export const membershipTypesSchema = SchemaFactory.createForClass(MembershipTypesSchema);

// Validate type be unique
membershipTypesSchema.post(
    'save',
    function (error: IMongooseError, doc: Document, next: NextFunction): void {
        if (error.name === 'MongoServerError' && error.code === 11000)
            return next(new Error('Type must be unique'));
        else return next(error);
    },
);
