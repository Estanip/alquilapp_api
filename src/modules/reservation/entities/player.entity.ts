import { IPlayer } from '../interfaces/player.interfaces';

export class Player implements IPlayer {
    private _user: string;
    private _fee!: number;

    get user(): string {
        return this._user;
    }
    get fee(): number {
        return this._fee;
    }
}
