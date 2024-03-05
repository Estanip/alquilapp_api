import { IUser, IUserDocument } from 'src/modules/users/interfaces/user.interface';

interface ILoginResponse extends Pick<IUser, 'email' | 'identification_number'> {
    readonly _id: string;
    readonly name: string;
    readonly token: string;
}
export class LoginResponseDto {
    static toResponse(data: IUserDocument, token: string): ILoginResponse | null {
        let user = null;
        if (data)
            user = {
                _id: data?._id.toString(),
                email: data?.email,
                name: `${data?.first_name} ${data?.last_name}`,
                identification_number: data?.identification_number,
                token,
            };
        return user;
    }
}
