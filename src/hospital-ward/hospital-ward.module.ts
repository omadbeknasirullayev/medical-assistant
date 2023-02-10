import { Module } from '@nestjs/common';
import { HospitalWardService } from './hospital-ward.service';
import { HospitalWardController } from './hospital-ward.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital, HospitalWard } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([Hospital, HospitalWard])],
  controllers: [HospitalWardController],
  providers: [HospitalWardService],
  exports: [HospitalWardService]
})
export class HospitalWardModule {}