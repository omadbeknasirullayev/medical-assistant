import { Module } from '@nestjs/common';
import { RegionModule } from './region/region.module';
import { DistrictModule } from './district/district.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalModule } from './hospital/hospital.module';
import { District, Hospital, Region, Specialist } from './entity';
import { HospitalWardModule } from './hospital-ward/hospital-ward.module';
import { SpecialistModule } from './specialist/specialist.module';
import { FilesModule } from './files/files.module';

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
      models: [Region, District, Hospital, Specialist],
      autoLoadModels: true,
      logging: false,
    }),
    RegionModule, DistrictModule, HospitalModule, HospitalWardModule, SpecialistModule, FilesModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
