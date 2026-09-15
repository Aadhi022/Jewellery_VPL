import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async findAll(isAdmin: boolean = false) {
    const where: any = { deletedAt: null, parentId: null };
    if (!isAdmin) where.visible = true;
    return this.prisma.category.findMany({
      where,
      include: { children: true },
      orderBy: { sortOrder: 'asc' }
    });
  }

  async findBySlug(slug: string, page = 1, limit = 10) {
    const category = await this.prisma.category.findUnique({
      where: { slug, deletedAt: null }
    });
    if (!category) throw new NotFoundException();
    
    const skip = (page - 1) * limit;
    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        where: { categoryId: category.id, deletedAt: null, status: 'AVAILABLE' },
        skip,
        take: limit,
        include: { images: true }
      }),
      this.prisma.product.count({ where: { categoryId: category.id, deletedAt: null, status: 'AVAILABLE' } })
    ]);
    return { category, products: { data: products, total, page, limit } };
  }

  async create(dto: CreateCategoryDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    return this.prisma.category.create({ data: { ...dto, slug } });
  }

  async update(id: string, dto: UpdateCategoryDto) {
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async softDelete(id: string) {
    return this.prisma.category.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async updateVisibility(id: string, visible: boolean) {
    return this.prisma.category.update({ where: { id }, data: { visible } });
  }
}
