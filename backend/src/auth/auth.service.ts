import { Body, HttpException, HttpStatus, Injectable, Post } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { PrismaService } from "../prisma.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '../mailer/mailer.service';
import * as types from  './jwt/jwt.strategy';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService, private readonly jwtService: JwtService, private readonly mailerService: MailerService) {}

  async register({ registerDto }: { registerDto: RegisterDto }) {
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email: registerDto.email,
      },
    });

    if (existingUser) {
      throw new HttpException('Existing email address', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await this.hashPassword({ password: registerDto.password} );
    const createdUser = await this.prisma.user.create({
      data: {
        email: registerDto.email,
        firstName: registerDto.firstName,
        lastName: registerDto.lastName,
        password: hashPassword,
        isActivated: false,
        role: 'USER',
      }
    });

    this.mailerService.sendCreatedAccountEmail({ recipient: registerDto.email, firstname: registerDto.firstName});

    return await this.authenticateUser( {userId: createdUser.uuid} );
  }

  async login({ loginDto }: { loginDto: LoginDto }) {
    try {
      const { email, password } = loginDto;

      const existingUser = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!existingUser) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }

      const hashedPassword = existingUser.password;

      const isPasswordValid = await this.isPasswordValid({ password, hashedPassword });

      if (!isPasswordValid) {
        throw new HttpException('Invalid credentials', HttpStatus.BAD_REQUEST);
      }

      const { password: _, ...userWithoutPassword } = existingUser;
      return await this.authenticateUser( {userId: userWithoutPassword.uuid} );
    } catch (error) {
      return {
        error: true,
         message: error.message,
      }
    }
  }

  private async hashPassword({ password }: { password: string }) {
    return await bcrypt.hash(password, 10);
  }

  private async isPasswordValid({ password, hashedPassword }: { password: string; hashedPassword: string }) {
    return await bcrypt.compare(password, hashedPassword);
  }

  private async authenticateUser({ userId }: types.UserPayload) {
    const payload: types.UserPayload = { userId };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
