import { Module } from '@nestjs/common';
import { UserSpecPermissionService } from './user_spec_permission.service';
import { UserSpecPermissionController } from './user_spec_permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserSpecPermission } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([UserSpecPermission])],
  controllers: [UserSpecPermissionController],
  providers: [UserSpecPermissionService]
})
export class UserSpecPermissionModule {}
