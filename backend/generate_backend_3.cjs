const fs = require('fs');
const path = require('path');
const srcDir = path.join(__dirname, 'src');
function ensureDir(dir) { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); }
function writeFile(filePath, content) { fs.writeFileSync(filePath, content.trim() + '\n', 'utf8'); }

// 3.5 Products Module
const prodDir = path.join(srcDir, 'products');
ensureDir(prodDir);
ensureDir(path.join(prodDir, 'dto'));

writeFile(path.join(prodDir, 'dto', 'product.dto.ts'), `
import { IsString, IsOptional, IsNumber, IsEnum, IsBoolean, IsArray, ValidateNested } from 'class-validator';
import { Type, Transform } from 'class-transformer';
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
`);

writeFile(path.join(prodDir, 'products.service.ts'), `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
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

  async create(dto: CreateProductDto) {
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
`);

writeFile(path.join(prodDir, 'products.controller.ts'), `
import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
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
`);

writeFile(path.join(prodDir, 'products.module.ts'), `
import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService]
})
export class ProductsModule {}
`);

// 3.6 Categories Module
const catDir = path.join(srcDir, 'categories');
ensureDir(catDir);
ensureDir(path.join(catDir, 'dto'));

writeFile(path.join(catDir, 'dto', 'category.dto.ts'), `
import { IsString, IsOptional, IsBoolean, IsEnum } from 'class-validator';
import { Material } from '@prisma/client';

export class CategoryDto {
  @IsString()
  name: string;
  @IsString()
  @IsOptional()
  description?: string;
  @IsEnum(Material)
  @IsOptional()
  material?: Material;
  @IsString()
  @IsOptional()
  parentId?: string;
  @IsBoolean()
  @IsOptional()
  visible?: boolean;
}
`);

writeFile(path.join(catDir, 'categories.service.ts'), `
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CategoryDto } from './dto/category.dto';

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

  async create(dto: CategoryDto) {
    const slug = dto.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();
    return this.prisma.category.create({ data: { ...dto, slug } });
  }

  async update(id: string, dto: CategoryDto) {
    return this.prisma.category.update({ where: { id }, data: dto });
  }

  async softDelete(id: string) {
    return this.prisma.category.update({ where: { id }, data: { deletedAt: new Date() } });
  }

  async updateVisibility(id: string, visible: boolean) {
    return this.prisma.category.update({ where: { id }, data: { visible } });
  }
}
`);

writeFile(path.join(catDir, 'categories.controller.ts'), `
import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDto } from './dto/category.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('categories')
  async findAll() {
    return this.categoriesService.findAll(false);
  }

  @Get('categories/:slug')
  async findOne(@Param('slug') slug: string, @Query('page') page: string = '1', @Query('limit') limit: string = '10') {
    return this.categoriesService.findBySlug(slug, Number(page), Number(limit));
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/categories')
  async adminFindAll() {
    return this.categoriesService.findAll(true);
  }

  @UseGuards(JwtAuthGuard)
  @Post('admin/categories')
  async create(@Body() dto: CategoryDto) {
    return this.categoriesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/categories/:id')
  async update(@Param('id') id: string, @Body() dto: CategoryDto) {
    return this.categoriesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('admin/categories/:id')
  async remove(@Param('id') id: string) {
    return this.categoriesService.softDelete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/categories/:id/visibility')
  async updateVisibility(@Param('id') id: string, @Body('visible') visible: boolean) {
    return this.categoriesService.updateVisibility(id, visible);
  }
}
`);

writeFile(path.join(catDir, 'categories.module.ts'), `
import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';

@Module({
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule {}
`);
