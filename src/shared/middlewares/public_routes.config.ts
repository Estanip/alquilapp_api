import { SetMetadata } from '@nestjs/common';
import { CONFIG } from '../Config/configuration';

export const IsPublic = () => SetMetadata(CONFIG.is_public, true);
