import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    create(createCategoryDto: CreateCategoryDto): Promise<{
        name: string;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<({
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
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    findOne(uuid: string): Promise<{
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
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(uuid: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        name: string;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(uuid: string): Promise<{
        name: string;
        id: number;
        uuid: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
