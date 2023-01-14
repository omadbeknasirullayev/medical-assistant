import { PartialType } from '@nestjs/swagger';
import { CreateLobaratoryDiagnosisDto } from './create-lobaratory_diagnosis.dto';

export class UpdateLobaratoryDiagnosisDto extends PartialType(CreateLobaratoryDiagnosisDto) {}
