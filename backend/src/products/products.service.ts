import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { ProductStatus } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll(filters: any, isAdmin: boolean = false) {
    const { material, categorySlug, status, featured, page = 1, limit = 10, search } = filters;
    const where: any = {};
    if (!isAdmin) {
      where.deletedAt = null;
      if (!status) where.status = 'AVAILABLE';
    }
    if (status) where.status = status;
    if (material) where.material = material;
    if (featured !== undefined) where.featured = featured === 'true' || featured === true;
    if (categorySlug) {
      where.category = { slug: categorySlug };
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { productCode: { contains: search, mode: 'insensitive' } },
      ];
    }
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    
    const [items, total] = await Promise.all([
      this.prisma.product.findMany({
        where,
        skip,
        take,
        include: { images: { orderBy: { sortOrder: 'asc' } }, category: true },
      }),
      this.prisma.product.count({ where }),
    ]);
    return { data: items, total, page: Number(page), limit: Number(limit) };
  }

  async findByProductCode(code: string) {
    const product = await this.prisma.product.findUnique({
      where: { productCode: code, deletedAt: null },
      include: { images: { orderBy: { sortOrder: 'asc' } }, category: true },
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findById(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: { images: true, category: true },
    });
    if (!product) throw new NotFoundException();
    return product;
  }

  async create(dto: CreateProductDto, adminId?: string) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    const productCode = 'PRD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    return this.prisma.product.create({
      data: { ...dto, slug, productCode },
    });
  }

  async update(id: string, dto: UpdateProductDto) {
    let slug;
    if (dto.name) {
      slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    }
    return this.prisma.product.update({
      where: { id },
      data: slug ? { ...dto, slug } : dto,
    });
  }

  async softDelete(id: string) {
    return this.prisma.product.update({
      where: { id },
      data: { deletedAt: new Date() },
    });
  }

  async updateStatus(id: string, status: ProductStatus) {
    return this.prisma.product.update({
      where: { id },
      data: { status },
    });
  }
}
