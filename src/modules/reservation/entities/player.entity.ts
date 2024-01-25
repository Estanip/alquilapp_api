import { User } from 'src/modules/users/entities/user.entity';
import { IPlayer } from '../interfaces/player.interfaces';

export class Player implements IPlayer {
    private _user: User;
    private _fee!: number;

    get user(): User {
        return this._user;
    }
    get fee(): number {
        return this._fee;
    }
}
