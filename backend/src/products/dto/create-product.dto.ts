import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean } from 'class-validator';
import { Material, ProductStatus, PriceVisibility } from '@prisma/client';

export class CreateProductDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(Material)
  material: Material;
  @IsString()
  purity: string;
  @IsNumber()
  weightGrams: number;
  @IsEnum(ProductStatus)
  @IsOptional()
  status?: ProductStatus;
  @IsBoolean()
  @IsOptional()
  featured?: boolean;
  @IsString()
  categoryId: string;
  @IsNumber()
  @IsOptional()
  estimatedValue?: number;
  @IsEnum(PriceVisibility)
  @IsOptional()
  priceVisibility?: PriceVisibility;
}

export class UpdateProductDto extends CreateProductDto {}
