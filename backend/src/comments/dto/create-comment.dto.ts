import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  content: string;

  @ApiProperty()
  @IsString()
  postId: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  parentId?: string;
}