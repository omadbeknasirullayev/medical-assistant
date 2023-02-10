import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SpecialistService } from './specialist.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Specialist } from 'src/entity';

@ApiTags('Spesialists')
@Controller('specialist')
export class SpecialistController {
    constructor(private readonly specialistService: SpecialistService) { }

    @ApiOperation({ summary: "Create specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Post()
    create(@Body() createSpecialistDto: CreateSpecialistDto) {
        return this.specialistService.create(createSpecialistDto);
    }

    @ApiOperation({ summary: "Get all specialists" })
    @ApiResponse({ status: 200, type: [Specialist] })
    @Get()
    findAll() {
        return this.specialistService.findAll();
    }

    @ApiOperation({ summary: "Get one specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.specialistService.findOne(+id);
    }

    @ApiOperation({ summary: "Update specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Patch(':id')
    @UseInterceptors(FileInterceptor('license'))
    update(@Param('id') id: string, @Body() updateSpecialistDto: UpdateSpecialistDto) {
        return this.specialistService.update(+id, updateSpecialistDto);
    }

    @ApiOperation({ summary: "Remove specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.specialistService.remove(+id);
    }

    @ApiOperation({ summary: "Activate specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Patch('activate/:id')
    activate(@Param('id') id: string) {
        return this.specialistService.activate(+id)
    }

    @ApiOperation({ summary: "DeActivate specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Patch('deActivate/:id')
    deActivate(@Param('id') id: string) {
        return this.specialistService.deActivate(+id)
    }

    @ApiOperation({ summary: "Add license of specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Patch('license/:id')
    @UseInterceptors(FileInterceptor('license'))
    createLicense(@Param('id') id: string, @UploadedFile() license) {
        return this.specialistService.createLicense(+id, license)
    }

    @ApiOperation({ summary: "Update license of specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Patch('license/:id')
    @UseInterceptors(FileInterceptor('license'))
    updateLicense(@Param('id') id: string, @UploadedFile() license) {
        return this.specialistService.createLicense(+id, license)
    }

    @ApiOperation({ summary: "Remove license of specialist" })
    @ApiResponse({ status: 200, type: Specialist })
    @Delete('license/:id')
    removeLicense(@Param('id') id: string) {
        return this.specialistService.deleteLicense(+id)
    }
}
