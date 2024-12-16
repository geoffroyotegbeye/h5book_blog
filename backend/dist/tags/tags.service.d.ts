import { PrismaService } from '../prisma/prisma.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTagDto: CreateTagDto): Promise<{
        name: string;
        id: number;
        uuid: string;
    }>;
    findAll(): Promise<({
        posts: ({
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
        } & {
            postId: string;
            tagId: string;
        })[];
    } & {
        name: string;
        id: number;
        uuid: string;
    })[]>;
    findOne(uuid: string): Promise<{
        posts: ({
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
        } & {
            postId: string;
            tagId: string;
        })[];
    } & {
        name: string;
        id: number;
        uuid: string;
    }>;
    update(uuid: string, updateTagDto: UpdateTagDto): Promise<{
        name: string;
        id: number;
        uuid: string;
    }>;
    remove(uuid: string): Promise<{
        name: string;
        id: number;
        uuid: string;
    }>;
}
