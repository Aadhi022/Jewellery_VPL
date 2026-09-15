import { Controller, Get, Post, Put, Delete, Patch, Body, Param, UseGuards } from '@nestjs/common';
import { CollectionsService } from './collections.service';
import { CreateCollectionDto, UpdateCollectionDto } from './dto/create-collection.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class CollectionsController {
  constructor(private readonly collectionsService: CollectionsService) {}

  @Get('collections')
  async findAll() {
    return this.collectionsService.findAll(false);
  }

  @Get('collections/featured')
  async findFeatured() {
    return this.collectionsService.findFeatured();
  }

  @Get('collections/:slug')
  async findOne(@Param('slug') slug: string) {
    return this.collectionsService.findBySlug(slug);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/collections')
  async adminFindAll() {
    return this.collectionsService.findAll(true);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/collections')
  async create(@Body() dto: CreateCollectionDto) {
    return this.collectionsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/collections/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCollectionDto) {
    return this.collectionsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/collections/:id')
  async remove(@Param('id') id: string) {
    return this.collectionsService.remove(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/collections/:id/products')
  async addProduct(@Param('id') id: string, @Body('productId') productId: string) {
    return this.collectionsService.addProduct(id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/collections/:id/products/:productId')
  async removeProduct(@Param('id') id: string, @Param('productId') productId: string) {
    return this.collectionsService.removeProduct(id, productId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/collections/:id/products/reorder')
  async reorderProducts(@Param('id') id: string, @Body('productIds') productIds: string[]) {
    return this.collectionsService.reorderProducts(id, productIds);
  }
}
