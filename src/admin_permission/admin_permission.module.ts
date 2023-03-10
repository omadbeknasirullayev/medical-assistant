import { Module } from '@nestjs/common';
import { AdminPermissionService } from './admin_permission.service';
import { AdminPermissionController } from './admin_permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { AdminPermission } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([AdminPermission])],
  controllers: [AdminPermissionController],
  providers: [AdminPermissionService],
  exports: [AdminPermissionService]
})
export class AdminPermissionModule {}
