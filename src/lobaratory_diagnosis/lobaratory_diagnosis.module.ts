import { Module } from '@nestjs/common';
import { LobaratoryDiagnosisService } from './lobaratory_diagnosis.service';
import { LobaratoryDiagnosisController } from './lobaratory_diagnosis.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital, LobaratoryDiagnosis, User } from 'src/entity';
import { FilesModule } from 'src/files/files.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminPermissionModule } from 'src/admin_permission/admin_permission.module';
import { UserPermissionModule } from 'src/user_permission/user_permission.module';
import { SpecPermissionModule } from 'src/spec_permission/spec_permission.module';
import { AdminModule } from 'src/admin/admin.module';
import { HospitalWardSpecModule } from 'src/hospital-ward-spec/hospital-ward-spec.module';

@Module({
  imports: [SequelizeModule.forFeature([LobaratoryDiagnosis, User, Hospital]), FilesModule, JwtModule, AdminPermissionModule, UserPermissionModule, SpecPermissionModule, AdminModule, HospitalWardSpecModule],
  controllers: [LobaratoryDiagnosisController],
  providers: [LobaratoryDiagnosisService]
})
export class LobaratoryDiagnosisModule {}
