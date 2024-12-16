import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private prisma;
    private usersService;
    private jwtService;
    constructor(prisma: PrismaService, usersService: UsersService, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<any>;
    login(user: any): Promise<{
        access_token: string;
    }>;
    register(userData: any): Promise<{
        access_token: string;
    }>;
}
