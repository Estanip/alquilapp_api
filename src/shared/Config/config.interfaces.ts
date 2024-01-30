import { IsEnum } from 'class-validator';

enum Environments {
    Development = 'development',
    Production = 'production',
    Test = 'test',
}

export class EnvironmentVariables {
    @IsEnum(Environments)
    ENVIRONMENT: Environments;
}

export interface IJwtVariables {
    expires: number;
    secret: string;
}

export interface IDatabaseVariables {
    host: string;
    name: string;
}

export interface IRoutesVariable {
    isPublic: boolean;
}
