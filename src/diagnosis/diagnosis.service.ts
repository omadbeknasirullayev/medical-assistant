import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Diagnosis } from 'src/entity';
import { CreateDiagnosisDto } from './dto/create-diagnosis.dto';
import { UpdateDiagnosisDto } from './dto/update-diagnosis.dto';

@Injectable()
export class DiagnosisService {
  constructor(@InjectModel(Diagnosis) private diagnosisRepository: typeof Diagnosis) { }
  
  async create(createDiagnosisDto: CreateDiagnosisDto) {
    return await this.diagnosisRepository.create(createDiagnosisDto)
  }

  async findAll() {
    return await this.diagnosisRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.diagnosisRepository.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateDiagnosisDto: UpdateDiagnosisDto) {
    return await this.diagnosisRepository.update(updateDiagnosisDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.diagnosisRepository.destroy({where: {id}})
  }
}
