"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const slugify_1 = require("slugify");
let PostsService = class PostsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createPostDto, authorId) {
        const slug = (0, slugify_1.default)(createPostDto.title, { lower: true });
        return this.prisma.post.create({
            data: {
                ...createPostDto,
                slug,
                authorId,
            },
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });
    }
    async findAll() {
        return this.prisma.post.findMany({
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });
    }
    async findOne(uuid) {
        const post = await this.prisma.post.findUnique({
            where: { uuid },
            include: {
                author: true,
                category: true,
                tags: true,
                comments: {
                    include: {
                        author: true,
                    },
                },
            },
        });
        if (!post) {
            throw new common_1.NotFoundException('Post not found');
        }
        return post;
    }
    async update(uuid, updatePostDto) {
        if (updatePostDto.title) {
            updatePostDto['slug'] = (0, slugify_1.default)(updatePostDto.title, { lower: true });
        }
        return this.prisma.post.update({
            where: { uuid },
            data: updatePostDto,
            include: {
                author: true,
                category: true,
                tags: true,
            },
        });
    }
    async remove(uuid) {
        return this.prisma.post.delete({
            where: { uuid },
        });
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostsService);
//# sourceMappingURL=posts.service.js.map