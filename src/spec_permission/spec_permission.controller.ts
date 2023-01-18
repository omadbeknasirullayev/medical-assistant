import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpecPermissionService } from './spec_permission.service';
import { CreateSpecPermissionDto } from './dto/create-spec_permission.dto';
import { UpdateSpecPermissionDto } from './dto/update-spec_permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SpecPermission } from 'src/entity';

@ApiTags('Spec-permission')
@Controller('spec-permission')
export class SpecPermissionController {
  constructor(private readonly specPermissionService: SpecPermissionService) {}

  @ApiOperation({ summary: "Create spec permission" })
  @ApiResponse({status: 200, type: SpecPermission})
  @Post()
  create(@Body() createSpecPermissionDto: CreateSpecPermissionDto) {
    return this.specPermissionService.create(createSpecPermissionDto);
  }

  @ApiOperation({ summary: "FindAll spec permission" })
  @ApiResponse({status: 200, type: [SpecPermission]})
  @Get()
  findAll() {
    return this.specPermissionService.findAll();
  }

  @ApiOperation({ summary: "FindOne spec permission" })
  @ApiResponse({status: 200, type: SpecPermission})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.specPermissionService.findOne(+id);
  }

  @ApiOperation({ summary: "Find by spec id spec permission" })
  @ApiResponse({status: 200, type: SpecPermission})
  @Get('getSpecById/:id')
  findByAdminId(@Param('id') id: string) {
    return this.specPermissionService.findBySpecId(+id)
  }

  @ApiOperation({ summary: "Update spec permission" })
  @ApiResponse({status: 200, type: SpecPermission})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpecPermissionDto: UpdateSpecPermissionDto) {
    return this.specPermissionService.update(+id, updateSpecPermissionDto);
  }

  @ApiOperation({ summary: "Remove spec permission" })
  @ApiResponse({status: 200, type: SpecPermission})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.specPermissionService.remove(+id);
  }
}
