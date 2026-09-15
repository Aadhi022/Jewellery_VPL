import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/create-collection.dto';

@Injectable()
export class CollectionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(isAdmin: boolean = false) {
    const where: any = {};
    if (!isAdmin) where.status = 'PUBLISHED';
    return this.prisma.collection.findMany({ where, orderBy: { sortOrder: 'asc' } });
  }

  async findFeatured() {
    return this.prisma.collection.findMany({
      where: { status: 'PUBLISHED', featured: true },
      orderBy: { sortOrder: 'asc' }
    });
  }

  async findBySlug(slug: string) {
    const collection = await this.prisma.collection.findUnique({
      where: { slug },
      include: {
        products: {
          include: { product: { include: { images: true } } },
          orderBy: { sortOrder: 'asc' }
        }
      }
    });
    if (!collection) throw new NotFoundException();
    return collection;
  }

  async create(dto: CreateCollectionDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    return this.prisma.collection.create({ data: { ...dto, slug } });
  }

  async update(id: string, dto: UpdateCollectionDto) {
    return this.prisma.collection.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    return this.prisma.collection.delete({ where: { id } });
  }

  async addProduct(collectionId: string, productId: string) {
    return this.prisma.collectionProduct.create({
      data: { collectionId, productId }
    });
  }

  async removeProduct(collectionId: string, productId: string) {
    return this.prisma.collectionProduct.delete({
      where: { collectionId_productId: { collectionId, productId } }
    });
  }

  async reorderProducts(collectionId: string, orderedProductIds: string[]) {
    // Basic implementation
    for (let i = 0; i < orderedProductIds.length; i++) {
      await this.prisma.collectionProduct.update({
        where: { collectionId_productId: { collectionId, productId: orderedProductIds[i] } },
        data: { sortOrder: i }
      });
    }
    return { success: true };
  }
}
