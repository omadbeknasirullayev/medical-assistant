import { Module } from '@nestjs/common';
import { DiagnosisService } from './diagnosis.service';
import { DiagnosisController } from './diagnosis.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Diagnosis, Specialist, User } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([Diagnosis, User, Specialist])],
  controllers: [DiagnosisController],
  providers: [DiagnosisService]
})
export class DiagnosisModule {}
