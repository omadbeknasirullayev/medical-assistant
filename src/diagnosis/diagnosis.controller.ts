import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Diagnosis } from 'src/entity';
import { DiagnosisService } from './diagnosis.service';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@ApiTags('Diagnosis')
@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly diagnosisService: DiagnosisService) {}

  @ApiOperation({ summary: "Create diagnosis" })
  @ApiResponse({status: 200, type: Diagnosis})
  @Post()
  create(@Body() createDiagnosisDto: CreateDiagnosisDto) {
    return this.diagnosisService.create(createDiagnosisDto);
  }

  @ApiOperation({ summary: "GetAll diagnosis" })
  @ApiResponse({status: 200, type: [Diagnosis]})
  @Get()
  findAll() {
    return this.diagnosisService.findAll();
  }

  @ApiOperation({ summary: "GetOne diagnosis" })
  @ApiResponse({status: 200, type: Diagnosis})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.diagnosisService.findOne(+id);
  }

  @ApiOperation({ summary: "Update diagnosis" })
  @ApiResponse({status: 200, type: Diagnosis})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDiagnosisDto: UpdateDiagnosisDto) {
    return this.diagnosisService.update(+id, updateDiagnosisDto);
  }

  @ApiOperation({ summary: "Remove diagnosis" })
  @ApiResponse({status: 200, type: Diagnosis})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.diagnosisService.remove(+id);
  }
}
