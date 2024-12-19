import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        bio: string | null;
        hashedRefreshToken: string | null;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
    }>;
    findAll(): Promise<{
        uuid: string;
        name: string;
        createdAt: Date;
        email: string;
        bio: string;
        role: import(".prisma/client").$Enums.Role;
        avatar: string;
    }[]>;
    findByEmail(email: string): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        bio: string | null;
        hashedRefreshToken: string | null;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
    }>;
    findOne(uuid: string): Promise<{
        posts: {
            id: number;
            uuid: string;
            title: string;
            content: string;
            published: boolean;
            authorId: string;
            groupId: string | null;
            createdAt: Date;
            updatedAt: Date;
            thumbnail: string | null;
            slug: string | null;
            categoryId: string | null;
        }[];
        profile: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            bio: string | null;
            userId: string;
            location: string | null;
            website: string | null;
        };
    } & {
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        bio: string | null;
        hashedRefreshToken: string | null;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
    }>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        bio: string | null;
        hashedRefreshToken: string | null;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
    }>;
    remove(uuid: string): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        bio: string | null;
        hashedRefreshToken: string | null;
        password: string | null;
        role: import(".prisma/client").$Enums.Role;
        avatar: string | null;
    }>;
}
