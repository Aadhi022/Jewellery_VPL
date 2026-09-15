import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [
      totalProducts,
      availableProducts,
      soldProducts,
      totalCollections,
      newEnquiries,
      appointmentRequests,
      rates
    ] = await Promise.all([
      this.prisma.product.count({ where: { deletedAt: null } }),
      this.prisma.product.count({ where: { status: 'AVAILABLE', deletedAt: null } }),
      this.prisma.product.count({ where: { status: 'SOLD', deletedAt: null } }),
      this.prisma.collection.count(),
      this.prisma.enquiry.count({ where: { status: 'NEW' } }),
      this.prisma.enquiry.count({ where: { type: 'APPOINTMENT', status: 'NEW' } }),
      this.prisma.metalRate.findMany()
    ]);

    return {
      totalProducts,
      availableProducts,
      soldProducts,
      totalCollections,
      newEnquiries,
      appointmentRequests,
      rates
    };
  }
}
