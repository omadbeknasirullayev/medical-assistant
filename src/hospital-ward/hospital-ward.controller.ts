import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalWardService } from './hospital-ward.service';
import { CreateHospitalWardDto } from './dto/create-hospital-ward.dto';
import { UpdateHospitalWardDto } from './dto/update-hospital-ward.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HospitalWard } from 'src/entity';

@ApiTags('Hospital-ward')
@Controller('hospital-ward')
export class HospitalWardController {
  constructor(private readonly hospitalWardService: HospitalWardService) {}

  @ApiOperation({ summary: "Create hospital ward" })
  @ApiResponse({status: 200, type: HospitalWard})
  @Post()
  create(@Body() createHospitalWardDto: CreateHospitalWardDto) {
    return this.hospitalWardService.create(createHospitalWardDto);
  }

  @ApiOperation({ summary: "Find All hospital ward" })
  @ApiResponse({status: 200, type: [HospitalWard]})
  @Get()
  findAll() {
    return this.hospitalWardService.findAll();
  }

  @ApiOperation({ summary: "FindOne hospital ward" })
  @ApiResponse({status: 200, type: HospitalWard})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalWardService.findOne(+id);
  }

  @ApiOperation({ summary: "Update hospital ward" })
  @ApiResponse({status: 200, type: HospitalWard})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalWardDto: UpdateHospitalWardDto) {
    return this.hospitalWardService.update(+id, updateHospitalWardDto);
  }

  @ApiOperation({ summary: "Remove hospital ward" })
  @ApiResponse({status: 200, type: HospitalWard})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalWardService.remove(+id);
  }
}
