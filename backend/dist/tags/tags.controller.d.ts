import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
export declare class TagsController {
    private readonly tagsService;
    constructor(tagsService: TagsService);
    create(createTagDto: CreateTagDto): Promise<{
        id: number;
        uuid: string;
        name: string;
    }>;
    findAll(): Promise<({
        posts: ({
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
        } & {
            postId: string;
            tagId: string;
        })[];
    } & {
        id: number;
        uuid: string;
        name: string;
    })[]>;
    findOne(uuid: string): Promise<{
        posts: ({
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
        } & {
            postId: string;
            tagId: string;
        })[];
    } & {
        id: number;
        uuid: string;
        name: string;
    }>;
    update(uuid: string, updateTagDto: UpdateTagDto): Promise<{
        id: number;
        uuid: string;
        name: string;
    }>;
    remove(uuid: string): Promise<{
        id: number;
        uuid: string;
        name: string;
    }>;
}
