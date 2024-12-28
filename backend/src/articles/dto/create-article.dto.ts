import { IsString, IsOptional, IsBoolean, IsArray, IsDateString, IsInt, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleDto {
    @IsString()
    @ApiProperty()
    title: string;

    @IsString()
    @ApiProperty()
    author: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    source?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    category?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    summary?: string;

    @IsString()
    @ApiProperty()
    content: string;

    @IsOptional()
    @IsDateString()
    @ApiProperty()
    time?: string;

    @IsOptional()
    @IsString()
    @ApiProperty()
    image?: string;

    @IsOptional()
    @ApiProperty()
    @IsArray()
    tags?: string[];
}
