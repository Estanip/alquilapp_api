import { IPLayer } from '../interfaces/player.interfaces';
import { User } from 'src/modules/users/entities/user.entity';

export class Player implements IPLayer {
    private _user: User;
    private _fee: number;

    get user(): User {
        return this._user;
    }
    get fee(): number {
        return this._fee;
    }
}
