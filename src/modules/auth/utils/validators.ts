import { ForbiddenException, Injectable } from '@nestjs/common';
import { MemberRepository } from 'src/modules/member/member.repository';
import { MemberDocument } from 'src/modules/member/schemas';
import { IUserAttributes } from 'src/modules/users/interfaces';
import { UserDocument } from 'src/modules/users/schemas';

@Injectable()
export class AuthValidator {
  constructor(private readonly memberRepository: MemberRepository) {}
  _validatePassword(user: Partial<IUserAttributes>, password: string): void {
    const validatePassword: boolean = user.comparePasswords(password);
    if (!validatePassword) throw new ForbiddenException('Incorrect password');
  }

  async _validateMembershipType(user: Partial<UserDocument>) {
    const member = (await this.memberRepository.findOne(
      {
        identification_number: user.identification_number,
      },
      false,
    )) as MemberDocument;
    if (member)
      if (member.membership_type === user.membership_type) user.is_membership_validated = true;
  }
}
