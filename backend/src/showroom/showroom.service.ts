import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateShowroomDto, UpdateBusinessDto } from './dto/update-showroom.dto';

@Injectable()
export class ShowroomService {
  constructor(private prisma: PrismaService) {}

  async getPublicSettings() {
    const [showroom, business] = await Promise.all([
      this.prisma.showroomSettings.findFirst(),
      this.prisma.businessSettings.findFirst()
    ]);
    return { showroom, business };
  }

  async getShowroomSettings() {
    return this.prisma.showroomSettings.findFirst();
  }

  async updateShowroomSettings(dto: UpdateShowroomDto) {
    const existing = await this.prisma.showroomSettings.findFirst();
    if (existing) {
      return this.prisma.showroomSettings.update({ where: { id: existing.id }, data: dto });
    }
    return this.prisma.showroomSettings.create({ data: dto });
  }

  async getBusinessSettings() {
    return this.prisma.businessSettings.findFirst();
  }

  async updateBusinessSettings(dto: UpdateBusinessDto) {
    const existing = await this.prisma.businessSettings.findFirst();
    if (existing) {
      return this.prisma.businessSettings.update({ where: { id: existing.id }, data: dto });
    }
    return this.prisma.businessSettings.create({ data: dto });
  }
}
