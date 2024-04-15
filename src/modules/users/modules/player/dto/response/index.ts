import { UserSchema } from 'src/modules/users/schemas';
import { TUserCollection } from '../../../../interfaces';

interface IPLayerResponse extends Pick<UserSchema, 'email' | 'phone_number' | 'membership_type'> {
  readonly _id: string;
  readonly name: string;
}
export class PlayersResponseDto {
  static getAll(data: TUserCollection): IPLayerResponse[] {
    const players: IPLayerResponse[] = [];
    if (data?.length > 0) {
      data.map((user: UserSchema) =>
        players.push({
          _id: user?._id.toString(),
          email: user?.email,
          name: `${user?.first_name} ${user?.last_name}`,
          membership_type: user?.membership_type,
          phone_number: user?.phone_number,
        }),
      );
    }
    return players;
  }
}
