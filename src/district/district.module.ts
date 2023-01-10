import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { JwtModule } from '@nestjs/jwt';
import { District, Region } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([District, Region])],
  controllers: [DistrictController],
  providers: [DistrictService],
  exports: [DistrictService]
})
export class DistrictModule {}