import { PartialType } from '@nestjs/swagger';
import { CreateSpecPermissionDto } from './create-spec_permission.dto';

export class UpdateSpecPermissionDto extends PartialType(CreateSpecPermissionDto) {}
