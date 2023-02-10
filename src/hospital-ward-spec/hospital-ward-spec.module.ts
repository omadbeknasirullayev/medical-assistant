import { Module } from '@nestjs/common';
import { HospitalWardSpecService } from './hospital-ward-spec.service';
import { HospitalWardSpecController } from './hospital-ward-spec.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { HospitalWard, HospitalWardSpec, Specialist } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([HospitalWardSpec, HospitalWard, Specialist])],
  controllers: [HospitalWardSpecController],
  providers: [HospitalWardSpecService],
  exports: [HospitalWardSpecService]
})
export class HospitalWardSpecModule {}
