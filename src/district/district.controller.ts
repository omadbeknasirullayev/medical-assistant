import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DistrictService } from './district.service';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from '../entity/district.entity';

@ApiTags('District')
@Controller('district')
export class DistrictController {
  constructor(private readonly districtService: DistrictService) {}

  @ApiOperation({ summary: 'District name' })
  @ApiResponse({ status: 200, type: District })
  @Post()
  create(@Body() createDistrictDto: CreateDistrictDto) {
    return this.districtService.create(createDistrictDto);
  }

  @ApiOperation({ summary: 'Find all districts' })
  @ApiResponse({ status: 200, type: [District] })
  @Get()
  findAll() {
    return this.districtService.findAll();
  }

  @ApiOperation({ summary: 'Find One district' })
  @ApiResponse({ status: 200, type: District })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.districtService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updadate district' })
  @ApiResponse({ status: 200, type: District })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDistrictDto: UpdateDistrictDto) {
    return this.districtService.update(+id, updateDistrictDto);
  }

  @ApiOperation({ summary: 'remove district' })
  @ApiResponse({ status: 200, type: District })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.districtService.remove(+id);
  }
}