import { PartialType } from '@nestjs/swagger';
import { CreateAdminPermissionDto } from './create-admin_permission.dto';

export class UpdateAdminPermissionDto extends PartialType(CreateAdminPermissionDto) {}
