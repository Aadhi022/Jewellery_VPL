import { Module } from '@nestjs/common';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { ManualRateProvider } from './providers/manual-rate.provider';
import { RATE_PROVIDER } from './providers/rate-provider.interface';

@Module({
  providers: [
    RatesService,
    {
      provide: RATE_PROVIDER,
      useClass: ManualRateProvider
    }
  ],
  controllers: [RatesController],
  exports: [RatesService]
})
export class RatesModule {}
