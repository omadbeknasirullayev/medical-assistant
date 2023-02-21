import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecDateService } from './spec_date.service';
import { CreateSpecDateDto } from './dto/create-spec_date.dto';
import { UpdateSpecDateDto } from './dto/update-spec_date.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecDate } from 'src/entity';


@ApiTags("Space-date")
@Controller('spec-date')
export class SpecDateController {
  constructor(private readonly specDateService: SpecDateService) {}

  @ApiOperation({ summary: "Create space-date" })
  @ApiResponse({ status: 200, type: SpecDate})
  @Post()
  create(@Body() createSpecDateDto: CreateSpecDateDto) {
    return this.specDateService.create(createSpecDateDto);
  }


  @ApiOperation({ summary: "FindAll space-date" })
  @ApiResponse({ status: 200, type: [SpecDate] })
  @Get()
  findAll() {
    return this.specDateService.findAll();
  }


  @ApiOperation({ summary: "FindOne space-date" })
  @ApiResponse({ status: 200, type: SpecDate })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specDateService.findOne(+id);
  }

  @ApiOperation({ summary: "Update space-date" })
  @ApiResponse({ status: 200, type: SpecDate })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecDateDto: UpdateSpecDateDto) {
    return this.specDateService.update(+id, updateSpecDateDto);
  }


  @ApiOperation({ summary: "Remove space-date" })
  @ApiResponse({ status: 200, type: SpecDate })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specDateService.remove(+id);
  }
}
