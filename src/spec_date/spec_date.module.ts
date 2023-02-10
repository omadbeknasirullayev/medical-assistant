import { Module } from '@nestjs/common';
import { SpecDateService } from './spec_date.service';
import { SpecDateController } from './spec_date.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecDate } from 'src/entity';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([SpecDate]), FilesModule],
  controllers: [SpecDateController],
  providers: [SpecDateService]
})
export class SpecDateModule {}
