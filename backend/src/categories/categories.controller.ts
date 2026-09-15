import { Controller, Get, Post, Put, Delete, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/create-category.dto';
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
  async create(@Body() dto: CreateCategoryDto) {
    return this.categoriesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/categories/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
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
