import { Module } from '@nestjs/common';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalModule } from './hospital/hospital.module';
import { Diagnosis, District, Hospital, HospitalWard, HospitalWardSpec, LobaratoryDiagnosis, OTP, Permission, Recipe, Region, Specialist, Treatment, User, UserDate } from './entity';
import { HospitalWardModule } from './hospital-ward/hospital-ward.module';
import { SpecialistModule } from './specialist/specialist.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { UserDateModule } from './user_date/user_date.module';
import { HospitalWardSpecModule } from './hospital-ward-spec/hospital-ward-spec.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { LobaratoryDiagnosisModule } from './lobaratory_diagnosis/lobaratory_diagnosis.module';
import { TreatmentModule } from './treatment/treatment.module';
import { RecipeModule } from './recipe/recipe.module';
import { AdminModule } from './admin/admin.module';
import { PermissionModule } from './permission/permission.module';
import { UserSpecPermissionModule } from './user_spec_permission/user_spec_permission.module';
import { SpecDateModule } from './spec_date/spec_date.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Region, District, Hospital, HospitalWard, Specialist, User, UserDate, HospitalWardSpec, Diagnosis, LobaratoryDiagnosis, Treatment, Recipe, OTP, Permission],
      autoLoadModels: true,
      logging: false,
    }),

    RegionModule, DistrictModule, HospitalModule, HospitalWardModule, SpecialistModule, FilesModule, UsersModule, AuthModule, OtpModule, MailModule, UserDateModule, HospitalWardSpecModule, DiagnosisModule, LobaratoryDiagnosisModule, TreatmentModule, RecipeModule, AdminModule, PermissionModule, UserSpecPermissionModule, SpecDateModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule { }
