export class UserVerificationCodeDto {
    user: string;
    code: string;
}

export class ResendVerificationCodeDto {
    email: string;
}
