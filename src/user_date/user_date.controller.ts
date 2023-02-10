import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserDateService } from './user_date.service';
import { CreateUserDateDto } from './dto/create-user_date.dto';
import { UpdateUserDateDto } from './dto/update-user_date.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDate } from 'src/entity';

@ApiTags('user-date')
@Controller('user-date')
export class UserDateController {
  constructor(private readonly userDateService: UserDateService) {}

  @ApiOperation({ summary: 'Create user date' })
  @ApiResponse({status: 200, type: UserDate})
  @Post()
  create(@Body() createUserDateDto: CreateUserDateDto) {
    return this.userDateService.create(createUserDateDto);
  }

  @ApiOperation({ summary: 'GetAll user date' })
  @ApiResponse({status: 200, type: [UserDate]})
  @Get()
  findAll() {
    return this.userDateService.findAll();
  }

  @ApiOperation({ summary: 'GetOne user date' })
  @ApiResponse({status: 200, type: UserDate})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userDateService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update user date' })
  @ApiResponse({status: 200, type: UserDate})
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDateDto: UpdateUserDateDto) {
    return this.userDateService.update(+id, updateUserDateDto);
  }

  @ApiOperation({ summary: 'Delete user date' })
  @ApiResponse({status: 200, type: UserDate})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userDateService.remove(+id);
  }
}