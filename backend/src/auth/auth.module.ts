import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PrismaService } from "../prisma.service";
import  { JwtModule} from  '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy'
import { UserService } from '../user/user.service';
import { MailerService } from '../mailer/mailer.service';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtStrategy, UserService, MailerService]
})
export class AuthModule {}
