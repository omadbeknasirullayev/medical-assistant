import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from '../entity/region.entity';
import { JwtModule } from '@nestjs/jwt';
import { AdminModule } from 'src/admin/admin.module';
import { Admin } from 'src/entity';
import { HospitalWardModule } from 'src/hospital-ward/hospital-ward.module';

@Module({
  imports: [SequelizeModule.forFeature([Region, Admin]), JwtModule, AdminModule, HospitalWardModule],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService]
})
export class RegionModule {}