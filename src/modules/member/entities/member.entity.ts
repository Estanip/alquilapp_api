import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { IMember } from '../interfaces/member.interfaces';

export class Member implements IMember {
    private _user_id!: string;
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _identification_number: string;
    private _phone_number: string;
    private _birth_date: Date;
    private _is_enabled: boolean;
    private _membership_type: MembershipTypes;

    get user_id(): string {
        return this._user_id;
    }
    get first_name(): string {
        return this._first_name;
    }
    get last_name(): string {
        return this._last_name;
    }
    get email(): string {
        return this._email;
    }
    get identification_number(): string {
        return this._identification_number;
    }
    get phone_number(): string {
        return this._phone_number;
    }
    get birth_date(): Date {
        return this._birth_date;
    }
    get is_enabled(): boolean {
        return this._is_enabled;
    }
    get membership_type(): MembershipTypes {
        return this._membership_type;
    }
}
