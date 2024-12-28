import {Injectable, HttpException, HttpStatus} from '@nestjs/common';
import {CreateArticleTagDto} from './dto/create-article-tag.dto';
import {UpdateArticleTagDto} from './dto/update-article-tag.dto';
import {PrismaService} from "../prisma.service";

@Injectable()
export class ArticleTagsService {
    constructor(private readonly prisma: PrismaService) {
    }

    async create(createArticleTagDto: CreateArticleTagDto, userId: string) {
        try {
            const existingTag = await this.prisma.tag.findUnique({
                where: {
                    name: createArticleTagDto.name,
                },
            });

            if (existingTag) {
                throw new HttpException(
                    'Un tag existe déjà sous ce nom',
                    HttpStatus.BAD_REQUEST,
                );
            }

            const newTag = await this.prisma.tag.create({
                data: {
                    name: createArticleTagDto.name.trim(),
                    createdById: userId,
                },
            });

            return {
                error: false,
                message: 'Tag ajouté avec succès.',
                data: newTag,
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            };
        }
    }

    async findAll() {
        try {
            const tags = await this.prisma.tag.findMany({
                select: {
                    uuid: true,
                    name: true,
                    createdById: true,
                    createdAt: true,
                },
            });
            return {
                error: false,
                message: "Tags récupérés avec succès.",
                data: tags,
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async findOne({tagId}: { tagId: string }) {
        try {
            const existingTag = await this.prisma.tag.findUnique({
                where: {
                    uuid: tagId,
                }
            });

            if (!existingTag) {
                throw new HttpException("Tag introuvable", HttpStatus.BAD_REQUEST);
            }
            return {
                error: false,
                message: "Tag récupéré avec succès.",
                data: existingTag,
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async update({tagId, updateArticleTagDto}: {
        tagId: string,
        updateArticleTagDto: UpdateArticleTagDto,
    }) {

        try {
            const existingTag = await this.prisma.tag.findUnique({
                where: {
                    uuid: tagId,
                }
            });

            if (!existingTag) {
                throw new HttpException("Tag introuvable", HttpStatus.BAD_REQUEST);
            }

            if (existingTag.name === updateArticleTagDto.name.trim()) {
                throw new HttpException("Erreur lors de la mise à jour. Vous n'avez pas changé le nom du tag.", HttpStatus.BAD_REQUEST);
            }

            const existingTagName = await this.prisma.tag.findUnique({
                where: {
                    name: updateArticleTagDto.name.trim(),
                }
            });

            if (existingTagName) {
                throw new HttpException("Erreur lors de la mise à jour. Un tag existe déjà sous ce nom.", HttpStatus.BAD_REQUEST);
            }

            const updatedTag = await this.prisma.tag.update({
                where: {
                    uuid: tagId,
                },
                data: {
                    name: updateArticleTagDto.name.trim()
                }
            })
            return {
                error: false,
                message: "Tag mis à jour avec succès.",
                data: updatedTag,
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }

    async remove({tagId}: { tagId: string }) {

        try {
            const existingTag = await this.prisma.tag.findUnique({
                where: {
                    uuid: tagId,
                }
            });

            if (!existingTag) {
                throw new HttpException("Tag introuvable", HttpStatus.BAD_REQUEST);
            }

            await this.prisma.tag.delete({
                where: {
                    uuid: tagId,
                }
            });

            return {
                error: false,
                message: "Tag supprimé avec succès.",
            };
        } catch (error) {
            return {
                error: true,
                message: error.message,
            }
        }
    }
}
