import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/create-product.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductStatus } from '@prisma/client';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  async findAll(@Query() filters: any) {
    return this.productsService.findAll(filters, false);
  }

  @Get('products/featured')
  async findFeatured() {
    return this.productsService.findAll({ featured: true, limit: 10 }, false);
  }

  @Get('products/:productCode')
  async findOne(@Param('productCode') productCode: string) {
    return this.productsService.findByProductCode(productCode);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/products')
  async adminFindAll(@Query() filters: any) {
    return this.productsService.findAll(filters, true);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/products/:id')
  async adminFindOne(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/products')
  async create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/products/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/products/:id')
  async remove(@Param('id') id: string) {
    return this.productsService.softDelete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/products/:id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: ProductStatus) {
    return this.productsService.updateStatus(id, status);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/products/:id/featured')
  async updateFeatured(@Param('id') id: string, @Body('featured') featured: boolean) {
    return this.productsService.update(id, { featured } as any);
  }
}
