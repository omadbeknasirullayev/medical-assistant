import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OTP, User } from 'src/entity';
import { OtpService } from './otp.service';
import { OtpController } from './otp.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [SequelizeModule.forFeature([OTP, User]), UsersModule],
  providers: [OtpService],
  controllers: [OtpController]
})
export class OtpModule {}
