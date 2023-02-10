import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Admin } from 'src/entity';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { ForgotPasswordDto } from './dto/forgotPassDto';
import { LoginDto } from './dto/loginDto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Registration admin' })
  @ApiResponse({status: 200, type: Admin})
  @Post()
  registration(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.registration(createAdminDto);
  }

  @ApiOperation({ summary: 'Login admin' })
  @ApiResponse({status: 200, type: LoginDto})
  @Post('login')
  login(@Body() login: LoginDto) {
    return this.adminService.login(login)
  }

  @ApiOperation({ summary: 'Forgot admin password' })
  @ApiResponse({status: 200, type: Admin})
  @Post('forgotPassword')
  forgotPassword(@Body() forgotPass: ForgotPasswordDto) {
    return this.adminService.forgotPassword(forgotPass)
  }

  @ApiOperation({ summary: 'Find All admin' })
  @ApiResponse({status: 200, type: [Admin]})
  @Get()
  findAll() {
    return this.adminService.findAll();
  }

  @ApiOperation({ summary: 'FindOne admin' })
  @ApiResponse({status: 200, type: Admin})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update admin' })
  @ApiResponse({status: 200, type: Admin})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Remove admin' })
  @ApiResponse({status: 200, type: Admin})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
