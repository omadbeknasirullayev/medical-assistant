import { Module } from '@nestjs/common';
import { UserPermissionService } from './user_permission.service';
import { UserPermissionController } from './user_permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserPermission } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([UserPermission])],
  controllers: [UserPermissionController],
  providers: [UserPermissionService],
  exports: [UserPermissionService]
})
export class UserPermissionModule {}
