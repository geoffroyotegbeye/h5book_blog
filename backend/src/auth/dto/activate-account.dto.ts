import {
    IsEmail,
    IsNotEmpty,
} from 'class-validator';

export class ActivateAccountDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    activationCode: string;
}
