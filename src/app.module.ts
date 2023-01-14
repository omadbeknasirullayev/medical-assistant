import { Module } from '@nestjs/common';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalModule } from './hospital/hospital.module';
import { Diagnosis, District, Hospital, HospitalWard, HospitalWardSpec, LobaratoryDiagnosis, OTP, Recipe, Region, Specialist, Treatment, User, UserDate } from './entity';
import { HospitalWardModule } from './hospital-ward/hospital-ward.module';
import { SpecialistModule } from './specialist/specialist.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OtpModule } from './otp/otp.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { join } from 'path';
import { MailModule } from './mail/mail.module';
import { MailService } from './mail/mail.service';
import { ServiceModule } from './service/service.module';
// import { CryptoModule } from './crypto/crypto.module';
import { UserDateModule } from './user_date/user_date.module';
import { HospitalWardSpecModule } from './hospital-ward-spec/hospital-ward-spec.module';
import { DiagnosisModule } from './diagnosis/diagnosis.module';
import { LobaratoryDiagnosisModule } from './lobaratory_diagnosis/lobaratory_diagnosis.module';
import { TreatmentModule } from './treatment/treatment.module';
import { RecipeModule } from './recipe/recipe.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),

    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      models: [Region, District, Hospital, HospitalWard, Specialist, User, UserDate, HospitalWardSpec, Diagnosis, LobaratoryDiagnosis, Treatment, Recipe, OTP],
      autoLoadModels: true,
      logging: false,
    }),

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: () => ({
        transport: {
          service: 'gmail',
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          secure: false,
          auth: {

            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
          },
        },
        // defaults: {
        //   from: '<sendgrid_from_email_address>'
        // },
        // template: {
        //   dir: join(__dirname, './templates'),
        //   options: {
        //     strict: true
        //   }
        // }
      }),
      inject: [ConfigService],
    }),
    RegionModule, DistrictModule, HospitalModule, HospitalWardModule, SpecialistModule, FilesModule, UsersModule, AuthModule, OtpModule, MailModule, ServiceModule, UserDateModule, HospitalWardSpecModule, DiagnosisModule, LobaratoryDiagnosisModule, TreatmentModule, RecipeModule, AdminModule,
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule { }
