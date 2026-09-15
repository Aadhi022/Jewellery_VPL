import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { CollectionStatus } from '@prisma/client';

export class CreateCollectionDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
  @IsEnum(CollectionStatus)
  @IsOptional()
  status?: CollectionStatus;
  @IsString()
  @IsOptional()
  heroImageUrl?: string;
  @IsString()
  @IsOptional()
  heroPublicId?: string;
}

export class UpdateCollectionDto extends CreateCollectionDto {}
