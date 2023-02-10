import { Module } from '@nestjs/common';
import { SpecDateService } from './spec_date.service';
import { SpecDateController } from './spec_date.controller';

@Module({
  controllers: [SpecDateController],
  providers: [SpecDateService]
})
export class SpecDateModule {}
