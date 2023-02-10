import { PartialType } from '@nestjs/swagger';
import { CreateHospitalWardSpecDto } from './create-hospital-ward-spec.dto';

export class UpdateHospitalWardSpecDto extends PartialType(CreateHospitalWardSpecDto) {}
