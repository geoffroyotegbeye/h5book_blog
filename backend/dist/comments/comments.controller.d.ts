import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(req: any, createCommentDto: CreateCommentDto): Promise<{
        post: {
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
        };
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
    }>;
    findAll(): Promise<({
        post: {
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
        };
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
        replies: {
            id: number;
            uuid: string;
            postId: string;
            content: string;
            authorId: string;
            createdAt: Date;
            updatedAt: Date;
            parentId: string | null;
        }[];
    } & {
        id: number;
        uuid: string;
        postId: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
    })[]>;
    findOne(uuid: string): Promise<{
        post: {
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
        };
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
        replies: ({
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
    } & {
        id: number;
        uuid: string;
        postId: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
    }>;
    update(uuid: string, updateCommentDto: UpdateCommentDto): Promise<{
        post: {
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
        };
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
    }>;
    remove(uuid: string): Promise<{
        id: number;
        uuid: string;
        postId: string;
        content: string;
        authorId: string;
        createdAt: Date;
        updatedAt: Date;
        parentId: string | null;
    }>;
}
