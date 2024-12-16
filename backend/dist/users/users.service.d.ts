import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        password: string | null;
        bio: string | null;
        avatar: string | null;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findAll(): Promise<{
        name: string;
        email: string;
        bio: string;
        avatar: string;
        uuid: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string | null;
        bio: string | null;
        avatar: string | null;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findOne(uuid: string): Promise<{
        profile: {
            bio: string | null;
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            location: string | null;
            website: string | null;
        };
        posts: {
            title: string;
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            published: boolean;
            groupId: string | null;
            categoryId: string | null;
            thumbnail: string | null;
            authorId: string;
            slug: string | null;
        }[];
    } & {
        name: string;
        email: string;
        password: string | null;
        bio: string | null;
        avatar: string | null;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(uuid: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        password: string | null;
        bio: string | null;
        avatar: string | null;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
    remove(uuid: string): Promise<{
        name: string;
        email: string;
        password: string | null;
        bio: string | null;
        avatar: string | null;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        hashedRefreshToken: string | null;
        role: import(".prisma/client").$Enums.Role;
    }>;
}
