import { PartialType } from '@nestjs/swagger';
import { CreateSpecDateDto } from './create-spec_date.dto';

export class UpdateSpecDateDto extends PartialType(CreateSpecDateDto) {}
