import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserInfoDto } from './dto/createUserInfo.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Registration } from './dto/registration.dto';
import { Login } from './dto/login.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateBloodType } from './dto/createBloodType';
import { getByItemGuard } from 'src/guards/getByItem.guard';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @ApiOperation({ summary: "Registration user" })
  @ApiResponse({status: 200, type: Registration})
  @Post()
  registration(@Body() registration: Registration) {
    return this.usersService.registration(registration)
  }

  @ApiOperation({ summary: "Login user" })
  @ApiResponse({status: 200,type: String})
  @Post('login')
  login(@Body() login: Login) {
    return this.usersService.login(login)
  }

  @ApiOperation({ summary: "Logout user" })
  @ApiResponse({status: 200, type: Number})
  @Post('logout/:id')
  logout(@Param('id') id: string) {
    return this.usersService.logout(+id)
  }

  @ApiOperation({ summary: "Send email to user" })
  @ApiResponse({status: 200, type: User})
  @Post('sendEmail')
  forgotPassword(@Body() email: any) {
    // return this.usersService.forgotPassword(email.email)
  }

  @ApiOperation({ summary: "Activate user" })
  @ApiResponse({status: 200, type: User})
  @Patch('activate/:id')
  activation(@Param('id') id: string) {
    return this.usersService.activation(+id)
  }

  @ApiOperation({ summary: "deActivate user" })
  @ApiResponse({ status: 200, type: User })
  @Patch('deActivate/:id') 
  deActivation(@Param('id') id: string) {
    return this.usersService.deActivation(+id)
  }
    
  @ApiOperation({ summary: "Create user" })
  @ApiResponse({status: 200, type: User})
  @Post('create/:id')
  create(@Param('id') id: string, @Body() createUserDto: CreateUserInfoDto) {
    return this.usersService.create(+id, createUserDto);
  }

  @ApiOperation({ summary: 'Create avatar' })
  @ApiResponse({ status: 200, type: Number })
  @Post('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  createAvatar(@Param('id') id: string, @UploadedFile() photo) {
    return this.usersService.createAvatar(+id, photo)
  }

  @ApiOperation({ summary: 'Update avatar' })
  @ApiResponse({ status: 200, type: Number })
  @Patch('photo/:id')
  @UseInterceptors(FileInterceptor('photo'))
  updateAvatar(@Param('id') id: string, @UploadedFile() photo) {
    return this.usersService.updateAvatar(+id, photo)
  }

  @ApiOperation({ summary: 'Delete avatar' })
  @ApiResponse({ status: 200, type: Number })
  @Delete('photo/:id')
  removePohoto(@Param('id') id: string) {
    return this.usersService.deleteAvatar(+id)
  }
  
  @ApiOperation({ summary: 'create Blood type of user' })
  @ApiResponse({ status: 200, type: CreateBloodType })
  @Post('blood/:id')
  createBloodType(@Param('id') id: string, @Body() bloodType: CreateBloodType) {
    return this.usersService.createBloodType(+id, bloodType)
  }

  @ApiOperation({ summary: 'update Blood type of user' })
  @ApiResponse({ status: 200, type: CreateBloodType })
  @Patch('blood/:id')
  updateBloodType(@Param('id') id: string, @Body() bloodType: CreateBloodType) {
    return this.usersService.createBloodType(+id, bloodType)
  }

  @ApiOperation({ summary: "Find All user" })
  @ApiResponse({ status: 200, type: [User] })
    
  @UseGuards(getByItemGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Get One user" })
  @ApiResponse({status: 200, type: User})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiOperation({ summary: "Update user" })
  @ApiResponse({status: 200, type: User})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({ summary: "Remove user" })
  @ApiResponse({status: 200, type: User})
  @Delete('permenantly/:id')
  removePermenantly(@Param('id') id: string) {
    return this.usersService.removePermanently(+id);
  }

  @ApiOperation({ summary: "Remove user self" })
  @ApiResponse({ status: 200, type: User })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.deActivation(+id)
  }
}
