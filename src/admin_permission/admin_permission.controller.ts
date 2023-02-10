import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Permission } from 'src/entity';
import { AdminPermissionService } from './admin_permission.service';
import { CreateAdminPermissionDto } from './dto/create-admin_permission.dto';
import { UpdateAdminPermissionDto } from './dto/update-admin_permission.dto';

@ApiTags('Admin-permission')
@Controller('admin-permission')
export class AdminPermissionController {
  constructor(private readonly adminPermissionService: AdminPermissionService) {}

  @ApiOperation({ summary: "Create admin permission" })
  @ApiResponse({status: 200, type: Permission})
  @Post()
  create(@Body() createAdminPermissionDto: CreateAdminPermissionDto) {
    return this.adminPermissionService.create(createAdminPermissionDto);
  }

  @ApiOperation({ summary: "Find All admin permission" })
  @ApiResponse({status: 200, type: [Permission]})
  @Get()
  findAll() {
    return this.adminPermissionService.findAll();
  }

  @ApiOperation({ summary: "Find One admin permission" })
  @ApiResponse({status: 200, type: Permission})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminPermissionService.findOne(+id);
  }

  @ApiOperation({ summary: "Find by admin id admin permission" })
  @ApiResponse({status: 200, type: Permission})
  @Get('getAdminById/:id')
  findByAdminId(@Param('id') id: string) {
    return this.adminPermissionService.findByAdminId(+id)
  }

  @ApiOperation({ summary: "Update admin permission" })
  @ApiResponse({status: 200, type: Permission}) 
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminPermissionDto: UpdateAdminPermissionDto) {
    return this.adminPermissionService.update(+id, updateAdminPermissionDto);
  }

  @ApiOperation({ summary: "Remove admin permission" })
  @ApiResponse({status: 200, type: Permission})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminPermissionService.remove(+id);
  }
}
