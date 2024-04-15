import { IMembershipTypeDocument, TMembershipTypeCollection } from '../../interfaces';
import { MembershipTypesSchema } from '../../schemas';

interface IMembershipTypeResponse extends Omit<MembershipTypesSchema, '_id'> {
  _id: string;
}

export class MembershipTypeResponseDto {
  static getAll(data: TMembershipTypeCollection): IMembershipTypeResponse[] {
    let memberships: IMembershipTypeResponse[] = [];
    if (data?.length > 0) {
      memberships = data.map((membership: IMembershipTypeDocument) => {
        return {
          _id: membership?._id?.toString(),
          type: membership.type,
          description: membership.description,
          is_enabled: membership.is_enabled,
        };
      });
    }
    return memberships;
  }

  static getOne(data: IMembershipTypeDocument): IMembershipTypeResponse {
    let membership = null;
    if (Object.values(data).length) {
      membership = {
        _id: data?._id?.toString(),
        type: data.type,
        description: data.description,
        is_enabled: data.is_enabled,
      };
    }
    return membership;
  }
}
