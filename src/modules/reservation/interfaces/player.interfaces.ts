import { User } from 'src/modules/users/entities/user.entity';

export interface IPlayerAttributes {
    user: User;
    fee: number;
}

export interface IPLayer {
    user: User;
    fee: number;
}
