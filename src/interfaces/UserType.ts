import { Document } from 'mongoose';

enum EUserTypes {
    SOCIO = 'Socio',
    NO_SOCIO = 'No Socio',
    ABONADO = 'Abonado',
}

export interface IUserType extends Document {
    name: EUserTypes;
    status: string;
}
