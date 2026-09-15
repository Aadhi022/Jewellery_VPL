import { Controller, Get, Post, Put, Patch, Body, Param, Query, UseGuards } from '@nestjs/common';
import { EnquiriesService } from './enquiries.service';
import { CreateEnquiryDto, UpdateEnquiryDto } from './dto/create-enquiry.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Throttle } from '@nestjs/throttler';
import { EnquiryStatus } from '@prisma/client';

@Controller()
export class EnquiriesController {
  constructor(private readonly enquiriesService: EnquiriesService) {}

  @Throttle({ default: { limit: 5, ttl: 60 } })
  @Post('enquiries')
  async create(@Body() dto: CreateEnquiryDto) {
    return this.enquiriesService.create(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/enquiries')
  async findAll(@Query() filters: any) {
    return this.enquiriesService.findAll(filters);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/enquiries/:id')
  async findOne(@Param('id') id: string) {
    return this.enquiriesService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/enquiries/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateEnquiryDto) {
    return this.enquiriesService.update(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('admin/enquiries/:id/status')
  async updateStatus(@Param('id') id: string, @Body('status') status: EnquiryStatus) {
    return this.enquiriesService.updateStatus(id, status);
  }
}
