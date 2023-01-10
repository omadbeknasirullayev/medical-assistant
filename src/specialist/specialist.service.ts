import { HttpCode, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Specialist } from 'src/entity';
import { FilesService } from 'src/files/files.service';
import { CreateSpecialistDto } from './dto/create-specialist.dto';
import { UpdateSpecialistDto } from './dto/update-specialist.dto';

@Injectable()
export class SpecialistService {
  constructor(@InjectModel(Specialist) private specialistRepository: typeof Specialist,
    readonly fileService: FilesService) {}

  //create
  async create(createSpecialistDto: CreateSpecialistDto) {
    return await this.specialistRepository.create(createSpecialistDto)
  }

  //findAll
  async findAll() {
    return await this.specialistRepository.findAll({include: {all: true}})
  }

  //fineOne
  async findOne(id: number) {
    return await this.specialistRepository.findOne({where: {id}, include: {all: true}})
  }

  //update
  async update(id: number, updateSpecialistDto: UpdateSpecialistDto) { 
    return await this.specialistRepository.update(updateSpecialistDto, {where: {id}})
  }

  //remove
  async remove(id: number) {
    return await this.specialistRepository.destroy({where: {id}})
  }

  //activation
  async activate(id: number) {
    const spec = await this.specialistRepository.findOne({where: {id}})
    if (!spec) {
      throw new NotFoundException('Specialist not found')
    }
    await this.specialistRepository.update({is_active: true}, {where: {id}})
  }

  //create avatar
  async createAvatar(id: number, photo: any) {
    const fileName = await this.fileService.createFile(photo, '.jpg')
    return await this.specialistRepository.update({photo: fileName}, {where: {id}})    
  }

  //update avatar
  async updateAvatar(id: number, photo: any) {
    const spec = await this.specialistRepository.findOne({where: {id}})
    if (!spec) {
      throw new NotFoundException("Specialist not found")
    }
    await this.fileService.removeFile(spec.photo, '.jpg')
    const fileName = await this.fileService.createFile(photo, '.jpg')
    return await this.specialistRepository.update({photo: fileName}, {where: {id}})
  }

  //deleteAvatar
  async deleteAvatar(id: number) {
    const spec = await this.specialistRepository.findOne({where: {id}})
    if (!spec) {
      throw new NotFoundException('Specialist not found')
    }
    return await this.fileService.removeFile(spec.photo, '.jpg')
  }

  //create license
  async createLicense(id: number, license: any) {
    const fileName = await this.fileService.createFile(license, '.pdf')
    return this.specialistRepository.update({license: fileName}, {where: {id}})
  }

  //updateLicense 
  async updateLicense(id: number, license: any) {
    const spec = await this.specialistRepository.findOne({where: {id}})
    if (!spec) {
      throw new NotFoundException('Spec not found')
    }
    await this.fileService.removeFile(license, '.pdf')
    const fileName = await this.fileService.createFile(license, '.pdf')
    return await this.specialistRepository.update({license: fileName}, {where: {id}})
  }

   //deleteAvatar
   async deleteLicense(id: number) {
    const spec = await this.specialistRepository.findOne({where: {id}})
    if (!spec) {
      throw new NotFoundException('Specialist not found')
    }
    return await this.fileService.removeFile(spec.license, '.pdf')
  }
}