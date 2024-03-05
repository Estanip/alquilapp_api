import { IMemberDocument, TMemberCollection } from '../../interfaces/member.interfaces';
import { MemberSchema } from '../../schemas/MemberSchema';

interface IMemberResponse extends Omit<MemberSchema, '_id'> {
    _id: string;
}
export class MemberResponseDto {
    static getAll(data: TMemberCollection): IMemberResponse[] {
        let members: IMemberResponse[] = [];
        if (data?.length > 0) {
            members = data.map((member: IMemberDocument) => {
                return {
                    _id: member?._id?.toString(),
                    user_id: member.user_id,
                    first_name: member.first_name,
                    last_name: member.last_name,
                    email: member.email,
                    phone_number: member.phone_number,
                    identification_number: member.identification_number,
                    birth_date: member.birth_date,
                    is_enabled: member.is_enabled,
                    membership_type: member.membership_type,
                };
            });
        }
        return members;
    }

    static getOne(data: IMemberDocument): IMemberResponse {
        let member = null;
        if (Object.values(data).length) {
            member = {
                _id: data?._id?.toString(),
                user_id: data.user_id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                phone_number: data.phone_number,
                identification_number: data.identification_number,
                birth_date: data.birth_date,
                is_enabled: data.is_enabled,
                membership_type: data.membership_type,
            };
        }
        return member;
    }
}
