import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from '../entity/region.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([Region]), JwtModule],
  controllers: [RegionController],
  providers: [RegionService],
  exports: [RegionService]
})
export class RegionModule {}