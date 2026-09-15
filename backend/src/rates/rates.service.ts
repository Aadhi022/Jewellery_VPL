import { Injectable, Inject } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RATE_PROVIDER } from './providers/rate-provider.interface';
import type { RateProvider } from './providers/rate-provider.interface';
import { UpdateRateDto } from './dto/update-rate.dto';

@Injectable()
export class RatesService {
  constructor(
    private prisma: PrismaService,
    @Inject(RATE_PROVIDER) private rateProvider: RateProvider,
  ) {}

  async getCurrentRates() {
    return this.rateProvider.getCurrentRates();
  }

  async getHistory(metal?: string, page = 1, limit = 10) {
    const where: Record<string, unknown> = {};
    if (metal) where.metal = metal;
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.prisma.metalRateHistory.findMany({
        where,
        skip,
        take: limit,
        orderBy: { changedAt: 'desc' },
        include: { changedBy: { select: { name: true, email: true } } },
      }),
      this.prisma.metalRateHistory.count({ where }),
    ]);
    return { data, total, page, limit };
  }

  async updateRate(dto: UpdateRateDto, adminId: string) {
    const currentRate = await this.prisma.metalRate.findUnique({
      where: { metal_purity: { metal: dto.metal, purity: dto.purity } },
    });

    if (!currentRate) {
      return this.prisma.metalRate.create({
        data: {
          metal: dto.metal,
          purity: dto.purity,
          rate: dto.rate,
          updatedById: adminId,
        },
      });
    }

    return this.prisma.$transaction(async (tx) => {
      await tx.metalRateHistory.create({
        data: {
          metalRateId: currentRate.id,
          metal: dto.metal,
          purity: dto.purity,
          previousRate: currentRate.rate,
          newRate: dto.rate,
          changedById: adminId,
        },
      });

      return tx.metalRate.update({
        where: { id: currentRate.id },
        data: { rate: dto.rate, updatedById: adminId },
      });
    });
  }
}
