import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(req: any, createCommentDto: CreateCommentDto): Promise<{
        post: {
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
        };
        author: {
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
        };
    } & {
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
        parentId: string | null;
    }>;
    findAll(): Promise<({
        post: {
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
        };
        author: {
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
        };
        replies: {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            authorId: string;
            postId: string;
            parentId: string | null;
        }[];
    } & {
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
        parentId: string | null;
    })[]>;
    findOne(uuid: string): Promise<{
        post: {
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
        };
        author: {
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
        };
        replies: ({
            author: {
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
            };
        } & {
            id: number;
            uuid: string;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            authorId: string;
            postId: string;
            parentId: string | null;
        })[];
    } & {
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
        parentId: string | null;
    }>;
    update(uuid: string, updateCommentDto: UpdateCommentDto): Promise<{
        post: {
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
        };
        author: {
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
        };
    } & {
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
        parentId: string | null;
    }>;
    remove(uuid: string): Promise<{
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        authorId: string;
        postId: string;
        parentId: string | null;
    }>;
}
