import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { LobaratoryDiagnosisService } from './lobaratory_diagnosis.service';
import { CreateLobaratoryDiagnosisDto } from './dto/create-lobaratory_diagnosis.dto';
import { UpdateLobaratoryDiagnosisDto } from './dto/update-lobaratory_diagnosis.dto';
import { InjectModel } from '@nestjs/sequelize';
import { LobaratoryDiagnosis } from 'src/entity';
import { FilesService } from 'src/files/files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags("Lobaratory diagnosis")
@Controller('lobaratory-diagnosis')
export class LobaratoryDiagnosisController {
  constructor(private readonly lobaratoryDiagnosisService: LobaratoryDiagnosisService) {}

  @ApiOperation({ summary: "Create lobaratory diagnposis" })
  @ApiResponse({ status: 200, type: LobaratoryDiagnosis })
  @Post()
  @UseInterceptors(FileInterceptor('diagnosis_file'))
  create(@Body() createLobaratoryDiagnosisDto: CreateLobaratoryDiagnosisDto, @UploadedFile() diagnosis_file: any) {
    return this.lobaratoryDiagnosisService.create(createLobaratoryDiagnosisDto, diagnosis_file);
  }

  @ApiOperation({ summary: "Get all Lobaratory diagnosis" })
  @ApiResponse({status: 200, type: [LobaratoryDiagnosis]})
  @Get()
  findAll() {
    return this.lobaratoryDiagnosisService.findAll();
  }

  @ApiOperation({ summary: "Get One Lobaratory diagnosis" })
  @ApiResponse({status: 200, type: [LobaratoryDiagnosis]})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lobaratoryDiagnosisService.findOne(+id);
  }

  @ApiOperation({ summary: "Update Lobaratory diagnosis" })
  @ApiResponse({status: 200, type: [LobaratoryDiagnosis]})
  @Patch(':id')
  @UseInterceptors(FileInterceptor('diagnosis_file'))
  update(@Param('id') id: string, @Body() updateLobaratoryDiagnosisDto: UpdateLobaratoryDiagnosisDto, @UploadedFile() diagnosis_file: any) {
    return this.lobaratoryDiagnosisService.update(+id, updateLobaratoryDiagnosisDto, diagnosis_file);
  }
  
  @ApiOperation({ summary: "Remove Lobaratory diagnosis" })
  @ApiResponse({status: 200, type: [LobaratoryDiagnosis]})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lobaratoryDiagnosisService.remove(+id);
  }
}
