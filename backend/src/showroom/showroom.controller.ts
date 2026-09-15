import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { ShowroomService } from './showroom.service';
import { UpdateShowroomDto, UpdateBusinessDto } from './dto/update-showroom.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class ShowroomController {
  constructor(private readonly showroomService: ShowroomService) {}

  @Get('showroom')
  async getPublicSettings() {
    return this.showroomService.getPublicSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/settings/showroom')
  async getShowroomSettings() {
    return this.showroomService.getShowroomSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/settings/showroom')
  async updateShowroomSettings(@Body() dto: UpdateShowroomDto) {
    return this.showroomService.updateShowroomSettings(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/settings/business')
  async getBusinessSettings() {
    return this.showroomService.getBusinessSettings();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/settings/business')
  async updateBusinessSettings(@Body() dto: UpdateBusinessDto) {
    return this.showroomService.updateBusinessSettings(dto);
  }
}
