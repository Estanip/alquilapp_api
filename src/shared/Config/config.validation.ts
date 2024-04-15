import { ConflictException } from '@nestjs/common';
import { IConfig } from './config.interfaces';

export const _validateConfigValues = (config: IConfig): IConfig => {
  for (const [key, value] of Object.entries(config)) {
    if (value === undefined) throw new ConflictException(`Missing key ${key} in config.env`);
  }
  return config;
};
