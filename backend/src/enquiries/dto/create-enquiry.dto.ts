import { IsString, IsOptional, IsEnum } from 'class-validator';
import { EnquiryType, EnquiryStatus } from '@prisma/client';

export class CreateEnquiryDto {
  @IsString()
  customerName: string;
  @IsString()
  phone: string;
  @IsString()
  @IsOptional()
  email?: string;
  @IsString()
  @IsOptional()
  productId?: string;
  @IsString()
  @IsOptional()
  productCode?: string;
  @IsString()
  message: string;
  @IsEnum(EnquiryType)
  @IsOptional()
  type?: EnquiryType;
  @IsString()
  @IsOptional()
  preferredDate?: string;
  @IsString()
  @IsOptional()
  preferredTime?: string;
}

export class UpdateEnquiryDto {
  @IsEnum(EnquiryStatus)
  @IsOptional()
  status?: EnquiryStatus;
  @IsString()
  @IsOptional()
  notes?: string;
}
