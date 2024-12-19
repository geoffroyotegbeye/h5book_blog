import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
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
    } & {
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
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
    } & {
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(uuid: string): Promise<{
        id: number;
        uuid: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
