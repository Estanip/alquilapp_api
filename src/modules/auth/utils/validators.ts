import { ForbiddenException, Injectable } from '@nestjs/common';
import { IMemberDocument } from 'src/modules/member/interfaces';
import { MemberRepository } from 'src/modules/member/member.repository';
import { IUserDocument } from 'src/modules/users/interfaces';

@Injectable()
export class AuthValidator {
  constructor(private readonly memberRepository: MemberRepository) {}
  _validatePassword(user: Partial<IUserDocument>, password: string): void {
    const validatePassword: boolean = user.comparePasswords(password);
    if (!validatePassword) throw new ForbiddenException('Incorrect password');
  }

  async _validateMembershipType(user: Partial<IUserDocument>) {
    const member = (await this.memberRepository.findOne(
      {
        identification_number: user.identification_number,
      },
      false,
    )) as IMemberDocument;
    if (member)
      if (member.membership_type === user.membership_type) user.is_membership_validated = true;
  }
}
