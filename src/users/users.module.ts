import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District, User } from 'src/entity';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AdminPermissionModule } from 'src/admin_permission/admin_permission.module';
import { UserPermissionModule } from 'src/user_permission/user_permission.module';
import { SpecPermissionModule } from 'src/spec_permission/spec_permission.module';

@Module({
  imports: [SequelizeModule.forFeature([User, District]), AuthModule, MailModule, FilesModule, JwtModule, AdminPermissionModule, UserPermissionModule, SpecPermissionModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
 