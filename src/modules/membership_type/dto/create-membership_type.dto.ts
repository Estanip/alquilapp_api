import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsString } from 'class-validator';
import { MembershipTypes } from '../entities/membership_type.entity';

export class CreateMembershipTypeDto {
    @ApiProperty({ example: 'SOCIO' })
    @IsString()
    readonly type: MembershipTypes;

    @ApiProperty({ example: 'Descripcion' })
    @IsString()
    readonly description: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    readonly is_enabled: number;
}
