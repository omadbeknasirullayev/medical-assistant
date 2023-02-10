import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { where } from 'sequelize';
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

  async finByUserId(id: number) {
    return await this.treatmentRepository.findAll({where: {user_id: id}})
  }

  async findBySpecId(id: number) {
    return this.treatmentRepository.findAll({where: {spec_id: id}})
  }

  async findByHospitalId(id: number) {
    return await this.treatmentRepository.findAll({where: {hospital_id: id}})
  }

  async update(id: number, updateTreatmentDto: UpdateTreatmentDto) {
    return await this.treatmentRepository.update(updateTreatmentDto, { where: { id } })
  }

  async remove(id: number) {
    return await this.treatmentRepository.destroy({ where: { id } })
  }
}
