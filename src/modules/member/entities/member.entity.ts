import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { IMember } from '../interfaces/member.interfaces';

export class Member implements IMember {
    private _first_name: string;
    private _last_name: string;
    private _email: string;
    private _identification_number: string;
    private _phone_number: string;
    private _birth_date: Date;
    private _is_enabled: boolean;
    private _membership_type: MembershipTypes;

    get firstName(): string {
        return this._first_name;
    }
    get lastName(): string {
        return this._last_name;
    }
    get email(): string {
        return this._email;
    }
    get identificationNumber(): string {
        return this._identification_number;
    }
    get phoneNumber(): string {
        return this._phone_number;
    }
    get birthDate(): Date {
        return this._birth_date;
    }
    get isEnabled(): boolean {
        return this._is_enabled;
    }
    get membershipType(): MembershipTypes {
        return this._membership_type;
    }
}
