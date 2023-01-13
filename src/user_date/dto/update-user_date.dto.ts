import { PartialType } from '@nestjs/swagger';
import { CreateUserDateDto } from './create-user_date.dto';

export class UpdateUserDateDto extends PartialType(CreateUserDateDto) {}
