import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleCategoryDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;
}
