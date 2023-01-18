import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpecPermission } from 'src/entity';
import { CreateSpecPermissionDto } from './dto/create-spec_permission.dto';
import { UpdateSpecPermissionDto } from './dto/update-spec_permission.dto';

@Injectable()
export class SpecPermissionService {
  constructor(@InjectModel(SpecPermission) private specPermissionRepository: typeof SpecPermission) { }
  
  async create(createSpecPermissionDto: CreateSpecPermissionDto) {
    return await this.specPermissionRepository.create(createSpecPermissionDto)
  }

  async findAll() {
    return await this.specPermissionRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.specPermissionRepository.findOne({where: {id}, include: {all: true}})
  }

  async findBySpecId(id: number) {
    return await this.specPermissionRepository.findAll({where: {spec_id: id}, include: {all: true}})
  }

  async update(id: number, updateSpecPermissionDto: UpdateSpecPermissionDto) {
    return await this.specPermissionRepository.update(updateSpecPermissionDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.specPermissionRepository.destroy({where: {id}})
  }
}
