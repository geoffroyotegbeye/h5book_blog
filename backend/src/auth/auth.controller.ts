import { Body, Controller, Post, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { ActivateAccountDto } from "./dto/activate-account.dto";
import { JwtAuthGuard } from  './jwt/jwt-auth.guard';
import { UserService } from '../user/user.service';
import { RequestWithUser } from './jwt/jwt.strategy';

@Controller('auth')
export class AuthController {
  constructor( private readonly authService: AuthService, private readonly userService: UserService) {
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login({loginDto});
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAuthenticateUser(@Request() request: RequestWithUser) {
    return this.userService.getUser(request.user.userId);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register({registerDto});
  }

  @Post('activate-account')
  async activateAccount(@Body() activateAccountDto: ActivateAccountDto) {
    return await this.authService.activateAccount(activateAccountDto);
  }

  @Post('request-reset-password')
  async resetUserPasswordRequest(@Body('email') email: string) {
    return await this.authService.resetUserPasswordRequest({email});
  }

  @Get('verify-reset-password-token')
  async verifiedResetPasswordToken(@Body('token') token: string) {
    return await this.authService.verifiedResetPasswordToken({token});
  }

  @Post('reset-user-password')
  async resetUserPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return await this.authService.resetUserPassword(resetPasswordDto);
  }
}
