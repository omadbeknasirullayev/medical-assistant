import { Module } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { TreatmentController } from './treatment.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Hospital, HospitalWard, Recipe, Specialist, Treatment, User } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([Treatment, Recipe, HospitalWard, User, Specialist, Hospital])],
  controllers: [TreatmentController],
  providers: [TreatmentService]
})
export class TreatmentModule {}
