import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserPermissionService } from './user_permission.service';
import { CreateUserPermissionDto } from './dto/create-user_permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user_permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserPermission } from 'src/entity';

@ApiTags('User-permission')
@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @ApiOperation({ summary: "Create user permission" })
  @ApiResponse({status: 200, type: UserPermission})
  @Post()
  create(@Body() createUserPermissionDto: CreateUserPermissionDto) {
    return this.userPermissionService.create(createUserPermissionDto);
  }

  @ApiOperation({ summary: "FindAll user permission" })
  @ApiResponse({status: 200, type: [UserPermission]})
  @Get()
  findAll() {
    return this.userPermissionService.findAll();
  }

  @ApiOperation({ summary: "FindOne user permission" })
  @ApiResponse({status: 200, type: UserPermission})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userPermissionService.findOne(+id);
  }

  @ApiOperation({ summary: "Find by user id user permission" })
  @ApiResponse({status: 200, type: UserPermission})
  @Get('getUserById/:id')
  findByAdminId(@Param('id') id: string) {
    return this.userPermissionService.findByUserId(+id)
  }

  @ApiOperation({ summary: "Update user permission" })
  @ApiResponse({status: 200, type: UserPermission})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserPermissionDto: UpdateUserPermissionDto) {
    return this.userPermissionService.update(+id, updateUserPermissionDto);
  }

  @ApiOperation({ summary: "Remove user permission" })
  @ApiResponse({status: 200, type: UserPermission})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userPermissionService.remove(+id);
  }
}
