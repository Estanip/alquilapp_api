import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { MembershipTypes } from 'src/modules/member/interfaces';

export class CreateMembershipTypeDto {
    @ApiProperty({ example: 'SOCIO' })
    @IsNotEmpty()
    @IsString()
    readonly type: MembershipTypes;

    @ApiProperty({ example: 'Descripcion' })
    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @ApiProperty({ example: true })
    @IsOptional()
    @IsBoolean()
    readonly is_enabled: boolean;
}
