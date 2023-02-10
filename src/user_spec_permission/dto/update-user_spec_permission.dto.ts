import { PartialType } from '@nestjs/swagger';
import { CreateUserSpecPermissionDto } from './create-user_spec_permission.dto';

export class UpdateUserSpecPermissionDto extends PartialType(CreateUserSpecPermissionDto) {}
