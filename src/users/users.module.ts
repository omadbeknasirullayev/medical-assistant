import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { District, User } from 'src/entity';
import { AuthModule } from 'src/auth/auth.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailService } from 'src/mail/mail.service';
import { FilesModule } from 'src/files/files.module';

@Module({
  imports: [SequelizeModule.forFeature([User, District]), AuthModule, MailerModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService, MailService],
  exports: [UsersService]
})
export class UsersModule {}
 