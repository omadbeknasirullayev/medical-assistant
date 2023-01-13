import { Module } from '@nestjs/common';
import { UserDateService } from './user_date.service';
import { UserDateController } from './user_date.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserDate } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([UserDate])],
  controllers: [UserDateController],
  providers: [UserDateService]
})
export class UserDateModule {}
