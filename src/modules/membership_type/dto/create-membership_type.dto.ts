import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { MembershipTypes } from '../entities/membership_type.entity';

export class CreateMembershipTypeDto {
    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    readonly type: MembershipTypes;

    @ApiProperty({ example: 'Descripcion' })
    @IsNotEmpty()
    @IsString()
    readonly description: number;

    @ApiProperty({ example: true })
    @IsBoolean()
    readonly is_enabled: boolean;
}
