import 'dotenv/config';
const { IS_PUBLIC_KEY } = process.env;

import { SetMetadata } from '@nestjs/common';

export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
