import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecDateService } from './spec_date.service';
import { CreateSpecDateDto } from './dto/create-spec_date.dto';
import { UpdateSpecDateDto } from './dto/update-spec_date.dto';

@Controller('spec-date')
export class SpecDateController {
  constructor(private readonly specDateService: SpecDateService) {}

  @Post()
  create(@Body() createSpecDateDto: CreateSpecDateDto) {
    return this.specDateService.create(createSpecDateDto);
  }

  @Get()
  findAll() {
    return this.specDateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specDateService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecDateDto: UpdateSpecDateDto) {
    return this.specDateService.update(+id, updateSpecDateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specDateService.remove(+id);
  }
}
