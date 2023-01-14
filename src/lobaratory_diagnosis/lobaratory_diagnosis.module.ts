import { Module } from '@nestjs/common';
import { LobaratoryDiagnosisService } from './lobaratory_diagnosis.service';
import { LobaratoryDiagnosisController } from './lobaratory_diagnosis.controller';

@Module({
  controllers: [LobaratoryDiagnosisController],
  providers: [LobaratoryDiagnosisService]
})
export class LobaratoryDiagnosisModule {}
