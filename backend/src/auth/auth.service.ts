import {Body, HttpException, HttpStatus, Injectable, Post} from "@nestjs/common";
import {LoginDto} from "./dto/login.dto";
import {RegisterDto} from "./dto/register.dto";
import {ActivateAccountDto} from "./dto/activate-account.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
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
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: registerDto.email,
                },
            });

            const userRole = await this.prisma.role.findUnique({
                where: {
                    name: 'USER',
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
                    roles: {
                        connect: {
                            uuid: userRole.uuid,
                        }
                    },
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
        } catch (error) {
            return  {
                error: true,
                message: error.message
            }
        }
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

    async resetUserPasswordRequest({email}: { email: string }) {
        try {

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    email: email,
                },
            });

            if (!existingUser) {
                throw new HttpException('Adresse mail invalide.', HttpStatus.BAD_REQUEST);
            }

            if (existingUser.isResettingPassword) {
                throw new HttpException('Une demande de réinitialisation est déjà en cours.', HttpStatus.BAD_REQUEST);
            }

            const createdId = createId();

            await this.prisma.user.update({
                where: {
                    uuid: existingUser.uuid,
                },
                data: {
                    isResettingPassword: true,
                    resetPasswordToken: createdId,
                },
            });

            await this.mailerService.sendPasswordResetEmail({recipient: existingUser.email, firstname: existingUser.firstName, resetPasswordToken: createdId})
            return {
                error: false,
                message: 'Lien de réinitialisation envoyé avec succès.',
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async verifiedResetPasswordToken({token}: { token: string }) {
        try {

            const existingUser = await this.prisma.user.findUnique({
                where: {
                    resetPasswordToken: token,
                },
            });

            if (!existingUser) {
                throw new HttpException('Token invalide.', HttpStatus.BAD_REQUEST);
            }

            if (!existingUser.isResettingPassword) {
                throw new HttpException("Aucune demande de réinitialisation de mot de mot de passe n'est en cours.", HttpStatus.BAD_REQUEST);
            }

            return {
                error: false,
                message: 'Le token est valide et peut être utilisé.',
                token: existingUser.resetPasswordToken,
            }
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async resetUserPassword(resetPasswordDto: ResetPasswordDto) {
        try {
            const existingUser = await this.prisma.user.findUnique({
                where: {
                    resetPasswordToken: resetPasswordDto.token,
                },
            });

            if (!existingUser) {
                throw new HttpException("Utilisateur n'existe pas.", HttpStatus.BAD_REQUEST);
            }

            if (!existingUser.isResettingPassword) {
                throw new HttpException("Aucune demande de réinitialisation de mot de mot de passe n'est en cours.", HttpStatus.BAD_REQUEST);
            }

            const hashPassword = await this.hashPassword({password: resetPasswordDto.password});

            await this.prisma.user.update({
                where: {
                  uuid: existingUser.uuid
                },
                data: {
                    password: hashPassword,
                    isResettingPassword: false,
                    resetPasswordToken: null,
                }
            });

            return {
                error: false,
                message: 'Mot de passe réinitialisé avec succès.'
            };
        } catch (error) {
            return  {
                error: true,
                message: error.message
            }
        }
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
