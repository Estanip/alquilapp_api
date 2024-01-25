import { MembershipTypes } from '../../membership_type/entities/membership_type.entity';
import { IUser } from '../interfaces/user.interface';

export class User implements IUser {
    private _email: string;
    private _password: string;
    private _first_name: string;
    private _last_name: string;
    private _identification_number: string;
    private _membership_type: MembershipTypes;
    private _birth_date: Date;
    private _is_enabled: boolean;
    private _is_membership_validated: boolean;
    private _phone_number: string;

    get first_name(): string {
        return this._first_name;
    }
    get last_name(): string {
        return this._last_name;
    }
    get email(): string {
        return this._email;
    }
    get password(): string {
        return this._password;
    }
    get identification_number(): string {
        return this._identification_number;
    }
    get membership_type(): MembershipTypes {
        return this._membership_type;
    }
    get birth_date(): Date {
        return this._birth_date;
    }
    get is_enabled(): boolean {
        return this._is_enabled;
    }
    get is_membership_validated(): boolean {
        return this._is_membership_validated;
    }
    get phone_number(): string {
        return this.phone_number;
    }
}
