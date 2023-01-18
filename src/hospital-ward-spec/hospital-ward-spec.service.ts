import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { HospitalWardSpec } from 'src/entity';
import { CreateHospitalWardSpecDto } from './dto/create-hospital-ward-spec.dto';
import { UpdateHospitalWardSpecDto } from './dto/update-hospital-ward-spec.dto';

@Injectable()
export class HospitalWardSpecService {
  constructor(@InjectModel(HospitalWardSpec) private hospitalWardSpecRepository: typeof HospitalWardSpec) { }

  async create(createHospitalWardSpecDto: CreateHospitalWardSpecDto) {
    return await this.hospitalWardSpecRepository.create(createHospitalWardSpecDto)
  }

  async findAll() {
    return await this.hospitalWardSpecRepository.findAll({ include: { all: true } })
  }

  async findOne(id: number) {
    return await this.hospitalWardSpecRepository.findOne({ where: { id } })
  }

  async findBySpecId(id: number, ward: number) {
    return await this.hospitalWardSpecRepository.findOne({where: {spec_id: id, ward_id: ward}})
  }

  async update(id: number, updateHospitalWardSpecDto: UpdateHospitalWardSpecDto) {
    return await this.hospitalWardSpecRepository.update(updateHospitalWardSpecDto, { where: { id } })
  }

  async remove(id: number) {
    return await this.hospitalWardSpecRepository.destroy({ where: { id } })
  }
}
