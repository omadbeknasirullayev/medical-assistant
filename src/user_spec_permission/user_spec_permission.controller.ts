import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserSpecPermissionService } from './user_spec_permission.service';
import { CreateUserSpecPermissionDto } from './dto/create-user_spec_permission.dto';
import { UpdateUserSpecPermissionDto } from './dto/update-user_spec_permission.dto';

@Controller('user-spec-permission')
export class UserSpecPermissionController {
  constructor(private readonly userSpecPermissionService: UserSpecPermissionService) {}

  @Post()
  create(@Body() createUserSpecPermissionDto: CreateUserSpecPermissionDto) {
    return this.userSpecPermissionService.create(createUserSpecPermissionDto);
  }

  @Get()
  findAll() {
    return this.userSpecPermissionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userSpecPermissionService.findOne(+id);
  }

  @Get('ByUserId/:id') 
  findByUserId(@Param('id') id: string) {
    return this.userSpecPermissionService.findOnlyUserPermissions(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserSpecPermissionDto: UpdateUserSpecPermissionDto) {
    return this.userSpecPermissionService.update(+id, updateUserSpecPermissionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userSpecPermissionService.remove(+id);
  }
}
