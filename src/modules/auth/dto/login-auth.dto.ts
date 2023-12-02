import { RegisterDto } from './register-auth.dto';
import { PartialType, PickType } from '@nestjs/swagger';

export class LoginDto extends PartialType(PickType(RegisterDto, ['email', 'password'])) {}
