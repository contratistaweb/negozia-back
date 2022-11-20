import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty()
  @IsString()
  type: string;

  @ApiProperty()
  @IsArray()
  tags: string[];
}
