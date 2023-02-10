import { Module } from '@nestjs/common';
import { LobaratoryDiagnosisService } from './lobaratory_diagnosis.service';
import { LobaratoryDiagnosisController } from './lobaratory_diagnosis.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital, LobaratoryDiagnosis, User } from 'src/entity';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { HospitalWardSpecModule } from 'src/hospital-ward-spec/hospital-ward-spec.module';

@Module({
  imports: [SequelizeModule.forFeature([LobaratoryDiagnosis, User, Hospital]), FilesModule, JwtModule, AdminModule, HospitalWardSpecModule],
  controllers: [LobaratoryDiagnosisController],
  providers: [LobaratoryDiagnosisService]
})
export class LobaratoryDiagnosisModule {}
