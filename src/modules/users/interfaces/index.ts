import { UserDocument } from 'src/modules/users/schemas';

export interface IUserAttributes extends UserDocument {
  comparePasswords(password: string): boolean;
  generateToken(user: TUserTokenBody): string;
}

export type TUserCollection = UserDocument[];

export type TUserTokenBody = Pick<
  UserDocument,
  '_id' | 'email' | 'first_name' | 'last_name' | 'identification_number'
>;

export type TUserValidateResponse = Pick<
  UserDocument,
  '_id' | 'email' | 'first_name' | 'last_name'
>;
