import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Treatment } from 'src/entity';
import { CreateTreatmentDto } from './dto/create-treatment.dto';
import { UpdateTreatmentDto } from './dto/update-treatment.dto';

@Injectable()
export class TreatmentService {
  constructor(@InjectModel(Treatment) private treatmentRepository: typeof Treatment) { }

  async create(createTreatmentDto: CreateTreatmentDto) {
    return await this.treatmentRepository.create(createTreatmentDto)
  }

  async findAll() {
    return await this.treatmentRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return await this.treatmentRepository.findOne({ where: { id }, include: { all: true } })
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return await this.treatmentRepository.update(updateTreatmentDto, { where: { id } })
  }

  async remove(id: number) {
    return await this.treatmentRepository.destroy({ where: { id } })
  }
}
