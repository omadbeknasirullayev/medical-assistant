import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Hospital } from 'src/entity';
import { CreateHospitalDto } from './dto/create-hospital.dto';
import { UpdateHospitalDto } from './dto/update-hospital.dto';

@Injectable()
export class HospitalService {
  constructor(@InjectModel(Hospital) private hospitalRepository: typeof Hospital) {}

  async create(createHospitalDto: CreateHospitalDto) {
    return await this.hospitalRepository.create(createHospitalDto)
  }

  async findAll() {
    return await this.hospitalRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.hospitalRepository.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateHospitalDto: UpdateHospitalDto) {
    return await this.hospitalRepository.update(updateHospitalDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.hospitalRepository.destroy({where: {id}})
  }
}