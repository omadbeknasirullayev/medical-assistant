import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalWardSpecService } from './hospital-ward-spec.service';
import { CreateHospitalWardSpecDto } from './dto/create-hospital-ward-spec.dto';
import { UpdateHospitalWardSpecDto } from './dto/update-hospital-ward-spec.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HospitalWardSpec } from 'src/entity';

@ApiTags('Hospital-ward-spec')
@Controller('hospital-ward-spec')
export class HospitalWardSpecController {
  constructor(private readonly hospitalWardSpecService: HospitalWardSpecService) {}

  @ApiOperation({ summary: 'Create hospital ward spec' })
  @ApiResponse({status: 200, type: HospitalWardSpec})
  @Post()
  create(@Body() createHospitalWardSpecDto: CreateHospitalWardSpecDto) {
    return this.hospitalWardSpecService.create(createHospitalWardSpecDto);
  }

  @ApiOperation({ summary: 'GetAll hospital ward spec' })
  @ApiResponse({status: 200, type: [HospitalWardSpec]})
  @Get()
  findAll() {
    return this.hospitalWardSpecService.findAll();
  }

  @ApiOperation({ summary: 'GetOne hospital ward spec' })
  @ApiResponse({status: 200, type: HospitalWardSpec})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalWardSpecService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update hospital ward spec' })
  @ApiResponse({status: 200, type: HospitalWardSpec})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalWardSpecDto: UpdateHospitalWardSpecDto) {
    return this.hospitalWardSpecService.update(+id, updateHospitalWardSpecDto);
  }

  @ApiOperation({ summary: 'Remove hospital ward spec' })
  @ApiResponse({status: 200, type: HospitalWardSpec})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalWardSpecService.remove(+id);
  }
}
