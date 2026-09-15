import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEnquiryDto, UpdateEnquiryDto } from './dto/create-enquiry.dto';

@Injectable()
export class EnquiriesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateEnquiryDto) {
    return this.prisma.enquiry.create({ data: dto });
  }

  async findAll(filters: any) {
    const { status, type, page = 1, limit = 10 } = filters;
    const where: any = {};
    if (status) where.status = status;
    if (type) where.type = type;
    
    const skip = (Number(page) - 1) * Number(limit);
    const take = Number(limit);
    
    const [data, total] = await Promise.all([
      this.prisma.enquiry.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: { product: true }
      }),
      this.prisma.enquiry.count({ where })
    ]);
    return { data, total, page: Number(page), limit: Number(limit) };
  }

  async findOne(id: string) {
    const enquiry = await this.prisma.enquiry.findUnique({
      where: { id },
      include: { product: { include: { images: true } } }
    });
    if (!enquiry) throw new NotFoundException();
    return enquiry;
  }

  async update(id: string, dto: UpdateEnquiryDto) {
    return this.prisma.enquiry.update({
      where: { id },
      data: dto
    });
  }

  async updateStatus(id: string, status: any) {
    return this.prisma.enquiry.update({
      where: { id },
      data: { status }
    });
  }
}
