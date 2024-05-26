import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MembershipTypes } from 'src/modules/member/interfaces';

export class CreateMembershipTypeDto {
  @ApiProperty({ description: 'Membership type', example: 'SOCIO', enum: MembershipTypes })
  @IsNotEmpty()
  @IsString()
  readonly type: MembershipTypes;

  @ApiProperty({ description: 'Membership type description', example: 'Descripcion' })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ description: 'Membership type validation', default: false, example: true })
  @IsOptional()
  @IsBoolean()
  readonly is_enabled: boolean;
}
