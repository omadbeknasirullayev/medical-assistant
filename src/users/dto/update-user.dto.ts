import { PartialType } from '@nestjs/swagger';
import { CreateUserInfoDto } from './createUserInfo.dto';

export class UpdateUserDto extends PartialType (CreateUserInfoDto) {}
