import { ValidationError, ValidatorOptions } from 'class-validator';

export interface IValidationPipeOptions extends ValidatorOptions {
    transform?: boolean;
    disableErrorMessages?: boolean;
    exceptionFactory?: (errors: ValidationError[]) => any;
}
