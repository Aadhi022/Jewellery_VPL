import { Controller, Get, Put, Body, Query, UseGuards, Request } from '@nestjs/common';
import { RatesService } from './rates.service';
import { UpdateRateDto } from './dto/update-rate.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller()
export class RatesController {
  constructor(private readonly ratesService: RatesService) {}

  @Get('rates')
  async getPublicRates() {
    return this.ratesService.getCurrentRates();
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/rates')
  async adminGetRates() {
    return this.ratesService.getCurrentRates();
  }

  @UseGuards(JwtAuthGuard)
  @Put('admin/rates')
  async updateRate(@Body() dto: UpdateRateDto, @Request() req: { user: { userId: string } }) {
    return this.ratesService.updateRate(dto, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/rates/history')
  async getHistory(
    @Query('metal') metal?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.ratesService.getHistory(metal, Number(page), Number(limit));
  }
}
