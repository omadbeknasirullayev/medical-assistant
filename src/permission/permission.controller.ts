import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/entity';

@ApiTags('Permission')
@Controller('permission')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @ApiOperation({ summary: "Create permission" })
  @ApiResponse({status: 200, type: Permission})
  @Post()
  create(@Body() createPermissionDto: CreatePermissionDto) {
    return this.permissionService.create(createPermissionDto);
  }

  @ApiOperation({ summary: "Find All permission" })
  @ApiResponse({status: 200, type: [Permission]})
  @Get()
  findAll() {
    return this.permissionService.findAll();
  }

  @ApiOperation({ summary: "Find One permission" })
  @ApiResponse({status: 200, type: Permission})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.permissionService.findOne(+id);
  }

  @ApiOperation({ summary: "Update permission" })
  @ApiResponse({status: 200, type: Permission})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePermissionDto: UpdatePermissionDto) {
    return this.permissionService.update(+id, updatePermissionDto);
  }

  @ApiOperation({ summary: "Remove permission" })
  @ApiResponse({status: 200, type: Permission})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.permissionService.remove(+id);
  }
}
