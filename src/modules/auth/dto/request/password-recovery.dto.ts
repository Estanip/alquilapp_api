import { PickType } from '@nestjs/swagger';
import { LoginDto } from './login-auth.dto';

export class ChangePasswordDto extends PickType(LoginDto, ['email']) {
  new_password: string;
}
