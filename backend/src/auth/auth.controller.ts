import { Body, Controller, Post, Get, UseGuards, Request } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";
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
  async authenticateUser(@Request() request) {
    return this.userService.getUser(request.user.userId);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register({registerDto});
  }
}
