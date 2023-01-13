import { Module } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { SpecialistController } from './specialist.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Specialist, User } from 'src/entity';
import { FilesModule } from 'src/files/files.module'

@Module({
    imports: [SequelizeModule.forFeature([Specialist, User]), FilesModule],
    controllers: [SpecialistController],
    providers: [SpecialistService]
})
export class SpecialistModule { }
