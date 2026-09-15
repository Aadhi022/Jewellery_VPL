import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Material } from '@prisma/client';

export class CreateCategoryDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(Material)
  @IsOptional()
  material?: Material;
  @IsString()
  @IsOptional()
  parentId?: string;
  @IsBoolean()
  @IsOptional()
  visible?: boolean;
}

export class UpdateCategoryDto extends CreateCategoryDto {}
