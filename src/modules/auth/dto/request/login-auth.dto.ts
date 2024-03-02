import { PartialType, PickType } from '@nestjs/swagger';
import { RegisterDto } from './register-auth.dto';

export class LoginDto extends PartialType(PickType(RegisterDto, ['email', 'password'])) {}
