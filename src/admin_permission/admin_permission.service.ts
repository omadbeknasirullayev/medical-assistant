import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { AdminPermission } from 'src/entity';
import { CreateAdminPermissionDto } from './dto/create-admin_permission.dto';
import { UpdateAdminPermissionDto } from './dto/update-admin_permission.dto';

@Injectable()
export class AdminPermissionService {
  constructor(@InjectModel(AdminPermission) private adminPermissionRepository: typeof AdminPermission) { }

  async create(createAdminPermissionDto: CreateAdminPermissionDto) {
    return await this.adminPermissionRepository.create(createAdminPermissionDto)
  }

  async findAll() {
    return await this.adminPermissionRepository.findAll()
  }

  async findOne(id: number) {
    return await this.adminPermissionRepository.findOne({where: {id}, include: {all: true}})
  }

  async findByAdminId(id: number) {
    return await this.adminPermissionRepository.findAll({where: {admin_id: id}, include: {all: true}})
  }

  async update(id: number, updateAdminPermissionDto: UpdateAdminPermissionDto) {
    return await this.adminPermissionRepository.update(updateAdminPermissionDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.adminPermissionRepository.destroy({where: {id}})
  }

}