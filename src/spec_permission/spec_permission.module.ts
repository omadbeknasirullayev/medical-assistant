import { Module } from '@nestjs/common';
import { SpecPermissionService } from './spec_permission.service';
import { SpecPermissionController } from './spec_permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { SpecPermission } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([SpecPermission])],
  controllers: [SpecPermissionController],
  providers: [SpecPermissionService],
  exports: [SpecPermissionService]
})
export class SpecPermissionModule {}
