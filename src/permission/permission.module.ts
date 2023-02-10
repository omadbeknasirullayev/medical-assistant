import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Permission } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([Permission])],
  controllers: [PermissionController],
  providers: [PermissionService]
})
export class PermissionModule {}
