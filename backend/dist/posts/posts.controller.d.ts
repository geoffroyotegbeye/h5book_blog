import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(req: any, createPostDto: CreatePostDto): Promise<{
        author: {
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
        };
        category: {
            id: number;
            uuid: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
        comments: ({
            author: {
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
            };
        } & {
            id: number;
            uuid: string;
            postId: string;
            content: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
            name: string;
            createdAt: Date;
            updatedAt: Date;
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
