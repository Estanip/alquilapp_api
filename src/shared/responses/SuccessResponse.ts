import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsObject, IsString } from 'class-validator';

export class SuccessResponse {
    @ApiProperty({ example: true })
    @IsBoolean()
    private _success: boolean;

    @ApiProperty({ example: 200 })
    @IsNumber()
    private _statusCode: number;

    @ApiProperty({ example: 'Created Successfully' })
    @IsString()
    private _message: string;

    @ApiProperty({ example: { data: [] } })
    @IsObject()
    private _data: any;

    constructor(statusCode: number, message?: string, data?: any, success: boolean = true) {
        this._success = success;
        this._statusCode = statusCode;
        this._message = message;
        this._data = data;
    }
}
