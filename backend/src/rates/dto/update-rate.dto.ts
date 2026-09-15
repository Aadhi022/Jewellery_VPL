import { IsString, IsNumber, IsEnum } from 'class-validator';
import { Metal } from '@prisma/client';

export class UpdateRateDto {
  @IsEnum(Metal)
  metal: Metal;
  @IsString()
  purity: string;
  @IsNumber()
  rate: number;
}
