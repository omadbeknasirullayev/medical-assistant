import { PartialType } from '@nestjs/swagger';
import { CreateHospitalWardDto } from './create-hospital-ward.dto';

export class UpdateHospitalWardDto extends PartialType(CreateHospitalWardDto) {}
