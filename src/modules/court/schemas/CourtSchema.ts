import { Prop, Schema } from '@nestjs/mongoose';
import { AbstractDocument } from 'src/shared/database/repository/abstract.schema';
import { SurfaceTypes } from '../entities/court.entity';
import { ICourt } from '../interfaces/court.interfaces';

@Schema({ versionKey: false, timestamps: true })
export class CourtSchema extends AbstractDocument implements ICourt {
    @Prop({ type: String, enum: SurfaceTypes, required: true })
    surface_type: SurfaceTypes;

    @Prop({ type: Number, min: 1, max: 5, unique: true, required: true })
    court_number: number;

    @Prop({ type: String })
    available_from: string;

    @Prop({ type: String })
    available_until: string;

    @Prop({ type: Boolean })
    is_enabled: boolean;
}
