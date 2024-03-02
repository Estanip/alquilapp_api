import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class SuccessResponse {
    @ApiProperty({ example: true })
    @IsBoolean()
    private success: boolean;

    @ApiProperty({ example: 200 })
    @IsNumber()
    private statusCode: number;

    @ApiProperty({ example: 'Created Successfully' })
    @IsString()
    private message: string;

    @ApiProperty({ example: { data: [] } })
    @IsObject()
    private data: unknown;

    @ApiProperty({ example: { timestamp: '' } })
    @IsString()
    private timestamp: string;

    constructor(statusCode: number, message?: string, data?: unknown, success: boolean = true) {
        this.success = success;
        this.statusCode = statusCode;
        this.message = message;
        this.data = data;
        this.timestamp = new Date().toISOString();
    }
}
