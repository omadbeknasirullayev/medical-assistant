import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalService } from './hospital.service';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Hospital } from 'src/entity';

@ApiTags('Hospital')
@Controller('hospital')
export class HospitalController {
  constructor(private readonly hospitalService: HospitalService) {}

  @ApiOperation({ summary: "Create hospital" })
  @ApiResponse({status: 200, type: Hospital})
  @Post()
  create(@Body() createHospitalDto: CreateHospitalDto) {
    return this.hospitalService.create(createHospitalDto);
  }

  @ApiOperation({ summary: "FindAll hospital" })
  @ApiResponse({status: 200, type: [Hospital]})
  @Get()
  findAll() {
    return this.hospitalService.findAll();
  }

  @ApiOperation({ summary: "FindOne hospital" })
  @ApiResponse({status: 200, type: Hospital})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalService.findOne(+id);
  }

  @ApiOperation({ summary: "Update hospital" })
  @ApiResponse({status: 200, type: Hospital})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalDto: UpdateHospitalDto) {
    return this.hospitalService.update(+id, updateHospitalDto);
  }

  @ApiOperation({ summary: "Remove hospital" })
  @ApiResponse({status: 200, type: Hospital})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalService.remove(+id);
  }
}
