import { SetMetadata } from '@nestjs/common';
import { is_public } from '../Config/configuration';

export const IsPublic = () => SetMetadata(is_public, true);
