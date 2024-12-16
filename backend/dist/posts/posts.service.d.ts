import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPostDto: CreatePostDto, authorId: string): Promise<{
        author: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            bio: string | null;
            hashedRefreshToken: string | null;
            password: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        category: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tags: {
            postId: string;
            tagId: string;
        }[];
    } & {
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
    }>;
    findAll(): Promise<({
        author: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            bio: string | null;
            hashedRefreshToken: string | null;
            password: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        category: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tags: {
            postId: string;
            tagId: string;
        }[];
    } & {
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
    })[]>;
    findOne(uuid: string): Promise<{
        author: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            bio: string | null;
            hashedRefreshToken: string | null;
            password: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        category: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        comments: ({
            author: {
                id: number;
                uuid: string;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                email: string;
                bio: string | null;
                hashedRefreshToken: string | null;
                password: string | null;
                role: import(".prisma/client").$Enums.Role;
                avatar: string | null;
            };
        } & {
            id: number;
            uuid: string;
            content: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
            postId: string;
            parentId: string | null;
        })[];
        tags: {
            postId: string;
            tagId: string;
        }[];
    } & {
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
    }>;
    update(uuid: string, updatePostDto: UpdatePostDto): Promise<{
        author: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            email: string;
            bio: string | null;
            hashedRefreshToken: string | null;
            password: string | null;
            role: import(".prisma/client").$Enums.Role;
            avatar: string | null;
        };
        category: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
        tags: {
            postId: string;
            tagId: string;
        }[];
    } & {
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
    }>;
    remove(uuid: string): Promise<{
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
    }>;
}
