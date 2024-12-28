import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArticleTagDto {
    @IsNotEmpty()
    @ApiProperty()
    @IsString()
    name: string;
}
