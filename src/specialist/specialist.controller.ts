import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('specialist')
export class SpecialistController {
  constructor(private readonly specialistService: SpecialistService) {}

  @Post()
  create(@Body() createSpecialistDto: CreateSpecialistDto) {
    return this.specialistService.create(createSpecialistDto);
  }

  @Get()
  findAll() {
    return this.specialistService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specialistService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('license'))
  update(@Param('id') id: string, @Body() updateSpecialistDto: UpdateSpecialistDto) {
    return this.specialistService.update(+id, updateSpecialistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specialistService.remove(+id);
  }

  @Patch(':id')
  activate(@Param('id') id: string) {
    return this.specialistService.activate(+id)
  }

  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  createAvatar(@Param('id') id: string, @UploadedFile() photo) {
    return this.specialistService.createAvatar(+id, photo)
  }

  @Patch('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  updateAvatar(@Param('id') id: string, @UploadedFile() photo) {
    return this.specialistService.updateAvatar(+id, photo)
  }

  @Post('license/:id')
  @UseInterceptors(FileInterceptor('license'))
  createLicense(@Param('id') id: string, @UploadedFile() license) {
    return this.specialistService.createAvatar(+id, license)
  }

  @Patch('license/:id')
  @UseInterceptors(FileInterceptor('license'))
  updateLicense(@Param('id') id: string, @UploadedFile() license) {
    return this.specialistService.createAvatar(+id, license)
  }
}
