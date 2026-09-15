import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { RateProvider } from './rate-provider.interface';
import { Metal } from '@prisma/client';

@Injectable()
export class ManualRateProvider implements RateProvider {
  constructor(private prisma: PrismaService) {}

  async getCurrentRates(): Promise<any[]> {
    return this.prisma.metalRate.findMany();
  }

  async getRate(metal: string, purity: string): Promise<any> {
    const rate = await this.prisma.metalRate.findUnique({
      where: { metal_purity: { metal: metal as Metal, purity } }
    });
    if (!rate) throw new NotFoundException('Rate not found');
    return rate;
  }
}
