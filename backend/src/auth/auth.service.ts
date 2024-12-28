import {Body, HttpException, HttpStatus, Injectable, Post} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {ActivateAccountDto} from "./dto/activate-account.dto";
import {PrismaService} from "../prisma.service";
import * as bcrypt from 'bcrypt';
import {JwtService} from '@nestjs/jwt';
import {MailerService} from '../mailer/mailer.service';
import * as types from './jwt/jwt.strategy';
import {createId} from '@paralleldrive/cuid2';

@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly mailerService: MailerService) {
    }

    async register({registerDto}: { registerDto: RegisterDto }) {
        const existingUser = await this.prisma.user.findUnique({
            where: {
                email: registerDto.email,
            },
        });

        if (existingUser) {
            throw new HttpException('Existing email address', HttpStatus.BAD_REQUEST);
        }

        const hashPassword = await this.hashPassword({password: registerDto.password});
        const activationCode = Math.random().toString(36).substring(2, 7);
        const activationCodeExpiredAt = new Date(Date.now() + 5 * 60 * 1000);
        const createdUser = await this.prisma.user.create({
            data: {
                email: registerDto.email,
                firstName: registerDto.firstName,
                lastName: registerDto.lastName,
                password: hashPassword,
                isActivated: false,
                role: 'USER',
                activationCode: activationCode,
                activationCodeExpiredAt: activationCodeExpiredAt,
            }
        });

        await this.mailerService.sendCreatedAccountEmail({
            recipient: createdUser.email,
            firstname: createdUser.firstName
        });
        await this.sendActivationCode({
            recipient: createdUser.email,
            firstname: createdUser.firstName,
            activationCode: activationCode
        });
        return {
            error: false,
            message: 'Compte créé avec succès.'
        };
    }

    async login({loginDto}: { loginDto: LoginDto }) {
        try {
            const {email, password} = loginDto;

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!existingUser) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }

            const hashedPassword = existingUser.password;

            const isPasswordValid = await this.isPasswordValid({password, hashedPassword});

            if (!isPasswordValid) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }

            const {password: _, ...userWithoutPassword} = existingUser;
            return await this.authenticateUser({userId: userWithoutPassword.uuid});
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async resetUserPasswordRequest({userId}: { userId: string }) {
        try {

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    uuid: userId,
                },
            });

            if (!existingUser) {
                throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
            }

            const createdId = createId();

            await this.prisma.user.update({
                where: {
                    uuid: userId,
                },
                data: {
                    isResettingPassword: true,
                    resetPasswordToken: createdId,
                },
            });

            return await this.authenticateUser({userId: existingUser.uuid});
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async activateAccount(activateAccountDto: ActivateAccountDto) {
        const {email, activationCode} = activateAccountDto;

        const user = await this.prisma.user.findUnique({where: {email}});
        if (!user) {
            throw new HttpException("Utilisateur introuvable.", HttpStatus.BAD_REQUEST);
        }

        const validateAccount = await this.validateActivation({user, activationCode});

        if (validateAccount.error) {
            throw new HttpException(validateAccount.message, HttpStatus.BAD_REQUEST)
        }

        await this.prisma.user.update({
            where: {email},
            data: {
                isActivated: true,
                activatedAt: new Date(),
                activationCode: null,
                activationCodeExpiredAt: null,
            },
        });

        return this.authenticateUser({userId: user.uuid});
    }


    private async hashPassword({password}: { password: string }) {
        return await bcrypt.hash(password, 10);
    }

    private async isPasswordValid({password, hashedPassword}: { password: string; hashedPassword: string }) {
        return await bcrypt.compare(password, hashedPassword);
    }

    private async authenticateUser({userId}: types.UserPayload) {
        const payload: types.UserPayload = {userId};
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }

    private async sendActivationCode({recipient, firstname, activationCode}: {
        recipient: string,
        firstname: string,
        activationCode: string
    }) {
        this.mailerService.sendActivationCodeEmail({recipient, firstname, activationCode});
    }

    private async validateActivation({ user, activationCode }: { user: any, activationCode: string }) {
        if (user.isActivated) {
            return { error: true, message: "Le compte est déjà activé." };
        }

        if (user.activationCode !== activationCode) {
            return { error: true, message: "Le code d'activation est incorrect." };
        }

        if (user.activationCodeExpiredAt && new Date(user.activationCodeExpiredAt).getTime() < Date.now()) {
            return { error: true, message: "Le code d'activation a expiré." };
        }

        return { error: false, message: "Validation réussie." };
    }

}
