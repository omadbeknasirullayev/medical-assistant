import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HospitalWard } from 'src/entity';
import { CreateHospitalWardDto } from './dto/create-hospital-ward.dto';
import { UpdateHospitalWardDto } from './dto/update-hospital-ward.dto';

@Injectable()
export class HospitalWardService {
  constructor(@InjectModel(HospitalWard) private hospitalWardRepository: typeof HospitalWard) {}

  async create(createHospitalWardDto: CreateHospitalWardDto) {
    return await this.hospitalWardRepository.create(createHospitalWardDto)
  }

  async findAll() {
    return await this.hospitalWardRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.hospitalWardRepository.findOne({where: {id}, include: {all: true}})
  }

  async findByHospital (id: number, hospital_id: number) {
    return this.hospitalWardRepository.findOne({where: {id, hospital_id}})
  }

  async update(id: number, updateHospitalWardDto: UpdateHospitalWardDto) {
    return await this.hospitalWardRepository.update(updateHospitalWardDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.hospitalWardRepository.destroy({where: {id}})
  }
}
