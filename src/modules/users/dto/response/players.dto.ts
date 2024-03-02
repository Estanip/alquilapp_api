import { MembershipTypes } from 'src/modules/membership_type/entities/membership_type.entity';
import { TUserCollection } from '../../interfaces/user.interface';

export class PlayersResponseDto {
    readonly _id: string;
    readonly email: string;
    readonly name: string;
    readonly membership_type: MembershipTypes;
    readonly phone_number: string;

    static toResponse(data: TUserCollection): PlayersResponseDto[] {
        const players: PlayersResponseDto[] = [];
        if (data?.length > 0) {
            data.map((user) =>
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
