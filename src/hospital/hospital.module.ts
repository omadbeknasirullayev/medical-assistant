import { Module } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { HospitalController } from './hospital.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District, Hospital, Region } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([District, Region, Hospital])],
  controllers: [HospitalController],
  providers: [HospitalService]
})
export class HospitalModule {}
