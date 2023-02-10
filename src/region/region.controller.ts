import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Region } from '../entity/region.entity';
import { AddGuard } from 'src/guards/add.guard';

@ApiTags('Region')
@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  @ApiOperation({ summary: 'Region name' })
  @ApiResponse({ status: 200, type: Region })
  @UseGuards(AddGuard) 
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @ApiOperation({ summary: 'Find all regions' })
  @ApiResponse({ status: 200, type: [Region] })
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @ApiOperation({ summary: 'Find One region' })
  @ApiResponse({ status: 200, type: Region })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @ApiOperation({ summary: 'Updadate region' })
  @ApiResponse({ status: 200, type: Region })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @ApiOperation({ summary: 'remove region' })
  @ApiResponse({ status: 200, type: Region })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}