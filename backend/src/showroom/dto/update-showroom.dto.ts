import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class UpdateShowroomDto {
  @IsString() @IsOptional() businessName?: string;
  @IsString() @IsOptional() logoUrl?: string;
  @IsString() @IsOptional() logoPublicId?: string;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() whatsapp?: string;
  @IsString() @IsOptional() email?: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() city?: string;
  @IsString() @IsOptional() state?: string;
  @IsString() @IsOptional() pincode?: string;
  @IsString() @IsOptional() googleMapsUrl?: string;
  @IsString() @IsOptional() googleMapsEmbed?: string;
  @IsOptional() openingHours?: any;
  @IsOptional() socialLinks?: any;
}

export class UpdateBusinessDto {
  @IsString() @IsOptional() announcementBar?: string;
  @IsBoolean() @IsOptional() announcementBarVisible?: boolean;
  @IsOptional() certifications?: any;
  @IsString() @IsOptional() savingsSchemeContent?: string;
  @IsString() @IsOptional() pawnLoanContent?: string;
  @IsString() @IsOptional() heroHeading?: string;
  @IsString() @IsOptional() heroSubheading?: string;
  @IsString() @IsOptional() heroDescription?: string;
  @IsString() @IsOptional() heroCTAPrimary?: string;
  @IsString() @IsOptional() heroCTASecondary?: string;
  @IsString() @IsOptional() heroImageUrl?: string;
  @IsString() @IsOptional() heroImagePublicId?: string;
  @IsString() @IsOptional() footerTagline?: string;
  @IsString() @IsOptional() metaTitle?: string;
  @IsString() @IsOptional() metaDescription?: string;
}
