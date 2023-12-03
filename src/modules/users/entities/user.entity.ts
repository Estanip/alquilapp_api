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

    get firstName(): string {
        return this._first_name;
    }
    get lastName(): string {
        return this._last_name;
    }
    get email(): string {
        return this._email;
    }
    get password(): string {
        return this._password;
    }
    get identificationNumber(): string {
        return this._identification_number;
    }
    get membershipType(): MembershipTypes {
        return this._membership_type;
    }
    get birthDate(): Date {
        return this._birth_date;
    }
    get isEnabled(): boolean {
        return this._is_enabled;
    }
}
