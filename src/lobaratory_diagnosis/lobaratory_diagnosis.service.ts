import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { LobaratoryDiagnosis } from 'src/entity';
import { FilesService } from 'src/files/files.service';
import { CreateLobaratoryDiagnosisDto } from './dto/create-lobaratory_diagnosis.dto';
import { UpdateLobaratoryDiagnosisDto } from './dto/update-lobaratory_diagnosis.dto';

@Injectable()
export class LobaratoryDiagnosisService {
  constructor(@InjectModel(LobaratoryDiagnosis) private lobaratoryDiagnosisRepository: typeof LobaratoryDiagnosis, private fileService: FilesService) { }
  
  //create lobaratory diagnosis
  async create(createLobaratoryDiagnosisDto: CreateLobaratoryDiagnosisDto, diagnosis_file: any) {
    const fileName = await this.fileService.createFile(diagnosis_file, 'diagnosis')
    return await this.lobaratoryDiagnosisRepository.create({...createLobaratoryDiagnosisDto, diagnosis_file: fileName})
  }

  //finad all lobaratory diagnosis
  async findAll() {
    return await this.lobaratoryDiagnosisRepository.findAll({include: {all: true}})
  }

  //FindAllForUsers
  async findAllForUsers(id: number) {
    return await this.lobaratoryDiagnosisRepository.findAll({where: {user_id: id}})
  }

  //FindAllForHospital
  async findAllForHospital(id: number) {
    return await this.lobaratoryDiagnosisRepository.findAll({where: {hospital_id: id}})
  }

  //get one
  async findOne(id: number) {
    return await this.lobaratoryDiagnosisRepository.findOne({where: {id}})
  }

  //update lobaratory diagnosis
  async update(id: number, updateLobaratoryDiagnosisDto: UpdateLobaratoryDiagnosisDto, diagnosis_file: any) {
    if (diagnosis_file) {
      const diagnos = await this.lobaratoryDiagnosisRepository.findOne({where: {id}})
      await this.fileService.removeFile(diagnos.diagnosis_file, "diagnosis", "diagnosis_file")
      const fileName = await this.fileService.createFile(diagnosis_file, 'diagnosis')
      return await this.lobaratoryDiagnosisRepository.update({...updateLobaratoryDiagnosisDto, diagnosis_file: fileName}, {where: {id}})
    }
    return await this.lobaratoryDiagnosisRepository.update(updateLobaratoryDiagnosisDto, {where: {id}})
  }

  async remove(id: number) {
    const diagnos = await this.lobaratoryDiagnosisRepository.findOne({ where: { id } })
    await this.fileService.removeFile(diagnos.diagnosis_file, 'diagnosis', 'diagnosis_file')
    return await this.lobaratoryDiagnosisRepository.destroy({where: {id}})
  }
}