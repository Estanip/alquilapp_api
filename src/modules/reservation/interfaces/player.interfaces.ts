import { User } from 'src/modules/users/entities/user.entity';

export interface IPlayer {
    user: User;
    fee: number;
}
