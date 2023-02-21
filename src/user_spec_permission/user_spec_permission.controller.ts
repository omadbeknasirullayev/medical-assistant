import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSpecPermissionService } from './user_spec_permission.service';
import { CreateUserSpecPermissionDto } from './dto/create-user_spec_permission.dto';
import { UpdateUserSpecPermissionDto } from './dto/update-user_spec_permission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserSpecPermission } from 'src/entity';

@ApiTags("user-spec-permission")
@Controller('user-spec-permission')
export class UserSpecPermissionController {
  constructor(private readonly userSpecPermissionService: UserSpecPermissionService) {}


  @ApiOperation({ summary: "Create User-Spec-Permission" })
  @ApiResponse({ status: 200, type: UserSpecPermission })
  @Post()
  create(@Body() createUserSpecPermissionDto: CreateUserSpecPermissionDto) {
    return this.userSpecPermissionService.create(createUserSpecPermissionDto);
  }


  @ApiOperation({ summary: "FindAll User-Spec-Permission" })
  @ApiResponse({ status: 200, type: [UserSpecPermission] })
  @Get()
  findAll() {
    return this.userSpecPermissionService.findAll();
  }


  @ApiOperation({ summary: "FindOne User-Spec-Permission" })
  @ApiResponse({ status: 200, type: UserSpecPermission })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSpecPermissionService.findOne(+id);
  }


  @ApiOperation({ summary: "Find by user_id User-Spec-Permission" })
  @ApiResponse({ status: 200, type: UserSpecPermission })
  @Get('ByUserId/:id') 
  findByUserId(@Param('id') id: string) {
    return this.userSpecPermissionService.findOnlyUserPermissions(+id);
  }


  @ApiOperation({ summary: "Update User-Spec-Permission" })
  @ApiResponse({ status: 200, type: UserSpecPermission })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSpecPermissionDto: UpdateUserSpecPermissionDto) {
    return this.userSpecPermissionService.update(+id, updateUserSpecPermissionDto);
  }


  @ApiOperation({ summary: "Remove User-Spec-Permission" })
  @ApiResponse({ status: 200, type: UserSpecPermission })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSpecPermissionService.remove(+id);
  }
}
