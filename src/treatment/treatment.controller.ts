import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TreatmentService } from './treatment.service';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Treatment } from 'src/entity';

@ApiTags("Treatment")
@Controller('treatment')
export class TreatmentController {
  constructor(private readonly treatmentService: TreatmentService) { }
  
  @ApiOperation({ summary: "create treatment" })
  @ApiResponse({ status: 200, type: Treatment })
  @Post()
  create(@Body() createTreatmentDto: CreateTreatmentDto) {
    return this.treatmentService.create(createTreatmentDto);
  }
  
  @ApiOperation({ summary: "Find all treatment" })
  @ApiResponse({ status: 200, type: [Treatment] })
  @Get()
  findAll() {
    return this.treatmentService.findAll();
  }
  
  @ApiOperation({ summary: "Find One treatment" })
  @ApiResponse({ status: 200, type: Treatment })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.treatmentService.findOne(+id);
  }


  @ApiOperation({ summary: "Find by user_id" })
  @ApiResponse({ status: 200, type: Treatment })
  @Get('findbyuser/:id') 
  findByUserId(@Param('id') id: string) {
    return this.treatmentService.finByUserId(+id)
  }


  @ApiOperation({ summary: "Find by spec_id" })
  @ApiResponse({ status: 200, type: Treatment })
  @Get('findbyspec/:id')
  findBySpecId(@Param('id') id: string) {
    return this.treatmentService.findBySpecId(+id)
  }


  @ApiOperation({ summary: "Find by hospital_id" })
  @ApiResponse({ status: 200, type: Treatment })
  @Get('findbyhospital/:id')
  findByHospitalId(@Param('id') id: string) {
    return this.treatmentService.findByHospitalId(+id)
  }
  
  @ApiOperation({ summary: "Update treatment" })
  @ApiResponse({ status: 200, type: Treatment })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTreatmentDto: UpdateTreatmentDto) {
    return this.treatmentService.update(+id, updateTreatmentDto);
  }
  
  @ApiOperation({ summary: "Remove treatment" })
  @ApiResponse({ status: 200, type: Treatment })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.treatmentService.remove(+id);
  }
}
