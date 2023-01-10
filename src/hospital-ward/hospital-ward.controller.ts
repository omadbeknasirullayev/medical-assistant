import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HospitalWardService } from './hospital-ward.service';
import { CreateHospitalWardDto } from './dto/create-hospital-ward.dto';
import { UpdateHospitalWardDto } from './dto/update-hospital-ward.dto';

@Controller('hospital-ward')
export class HospitalWardController {
  constructor(private readonly hospitalWardService: HospitalWardService) {}

  @Post()
  create(@Body() createHospitalWardDto: CreateHospitalWardDto) {
    return this.hospitalWardService.create(createHospitalWardDto);
  }

  @Get()
  findAll() {
    return this.hospitalWardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hospitalWardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHospitalWardDto: UpdateHospitalWardDto) {
    return this.hospitalWardService.update(+id, updateHospitalWardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hospitalWardService.remove(+id);
  }
}
