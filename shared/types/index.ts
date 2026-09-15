// ============================================================
// SHARED TYPES — Jewellery Showroom
// Consumed by both frontend and backend
// ============================================================

// --- Enums ---

export enum Material {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  DIAMOND = 'DIAMOND',
  PLATINUM = 'PLATINUM',
  OTHER = 'OTHER',
}

export enum ProductStatus {
  AVAILABLE = 'AVAILABLE',
  SOLD = 'SOLD',
  HIDDEN = 'HIDDEN',
}

export enum PriceVisibility {
  SHOW = 'SHOW',
  ON_ENQUIRY = 'ON_ENQUIRY',
  HIDDEN = 'HIDDEN',
}

export enum EnquiryType {
  PRODUCT = 'PRODUCT',
  APPOINTMENT = 'APPOINTMENT',
  GENERAL = 'GENERAL',
  PAWN_LOAN = 'PAWN_LOAN',
}

export enum EnquiryStatus {
  NEW = 'NEW',
  CONTACTED = 'CONTACTED',
  FOLLOW_UP = 'FOLLOW_UP',
  CLOSED = 'CLOSED',
}

export enum Metal {
  GOLD = 'GOLD',
  SILVER = 'SILVER',
  PLATINUM = 'PLATINUM',
}

// --- Product Types ---

export interface ProductImage {
  id: string;
  url: string;
  publicId: string;
  altText: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  description: string;
  material: Material;
  purity: string;
  weightGrams: number;
  status: ProductStatus;
  featured: boolean;
  estimatedValue?: number;
  priceVisibility: PriceVisibility;
  makingCharge?: number;
  wastage?: number;
  stoneCharge?: number;
  certification?: string;
  caratWeight?: number;
  cut?: string;
  clarity?: string;
  color?: string;
  tags: string[];
  category: Category;
  categoryId: string;
  images: ProductImage[];
  collections?: Collection[];
  createdAt: string;
  updatedAt: string;
}

export interface ProductSummary {
  id: string;
  productCode: string;
  name: string;
  slug: string;
  material: Material;
  purity: string;
  weightGrams: number;
  status: ProductStatus;
  featured: boolean;
  estimatedValue?: number;
  priceVisibility: PriceVisibility;
  category: Pick<Category, 'id' | 'name' | 'slug'>;
  primaryImage?: ProductImage;
}

// --- Category Types ---

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  material?: Material;
  parentId?: string;
  parent?: Pick<Category, 'id' | 'name' | 'slug'>;
  children?: Category[];
  sortOrder: number;
  visible: boolean;
  createdAt: string;
}

// --- Collection Types ---

export enum CollectionStatus {
  PUBLISHED = 'PUBLISHED',
  DRAFT = 'DRAFT',
  ARCHIVED = 'ARCHIVED',
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  heroImageUrl?: string;
  bannerImageUrl?: string;
  featured: boolean;
  status: CollectionStatus;
  sortOrder: number;
  products?: ProductSummary[];
  createdAt: string;
  updatedAt: string;
}

// --- Rate Types ---

export interface MetalRate {
  id: string;
  metal: Metal;
  purity: string;
  rate: number;
  currency: string;
  unit: string;
  updatedAt: string;
  updatedBy: string;
}

export interface MetalRateHistory {
  id: string;
  metal: Metal;
  purity: string;
  previousRate: number;
  newRate: number;
  changedBy: string;
  changedAt: string;
}

// --- Enquiry Types ---

export interface Enquiry {
  id: string;
  customerName: string;
  phone: string;
  email?: string;
  productId?: string;
  productCode?: string;
  product?: Pick<Product, 'name' | 'productCode'>;
  message: string;
  type: EnquiryType;
  status: EnquiryStatus;
  notes?: string;
  preferredDate?: string;
  preferredTime?: string;
  jewelleryCategory?: string;
  consultationFormat?: string;
  createdAt: string;
}

// --- Settings Types ---

export interface OpeningHours {
  day: string;
  open: string;
  close: string;
  closed: boolean;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  youtube?: string;
  twitter?: string;
}

export interface ShowroomSettings {
  id: string;
  businessName: string;
  logoUrl?: string;
  phone: string;
  whatsapp: string;
  email?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  googleMapsUrl?: string;
  googleMapsEmbed?: string;
  openingHours: OpeningHours[];
  socialLinks: SocialLinks;
}

export interface Certification {
  name: string;
  description: string;
  visible: boolean;
}

export interface BusinessSettings {
  id: string;
  announcementBar: string;
  announcementBarVisible: boolean;
  certifications: Certification[];
  savingsSchemeContent?: string;
  pawnLoanContent?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroDescription?: string;
  heroCTAPrimary?: string;
  heroCTASecondary?: string;
  heroImageUrl?: string;
  footerTagline?: string;
  metaTitle?: string;
  metaDescription?: string;
}

// --- API Response Types ---

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  statusCode: number;
  message: string;
  error?: string;
}

// --- Query/Filter Types ---

export interface ProductFilters {
  material?: Material;
  categorySlug?: string;
  collectionSlug?: string;
  purity?: string;
  minWeight?: number;
  maxWeight?: number;
  minPrice?: number;
  maxPrice?: number;
  status?: ProductStatus;
  featured?: boolean;
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: 'createdAt' | 'name' | 'estimatedValue' | 'weightGrams';
  sortOrder?: 'asc' | 'desc';
}

// --- WhatsApp Types ---

export interface WhatsAppEnquiryParams {
  productName: string;
  productCode: string;
  phoneNumber: string;
}

// --- Admin Dashboard Types ---

export interface DashboardStats {
  totalProducts: number;
  availableProducts: number;
  soldProducts: number;
  totalCollections: number;
  newEnquiries: number;
  appointmentRequests: number;
  rates: MetalRate[];
}
