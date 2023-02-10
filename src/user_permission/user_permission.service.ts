import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserPermission } from 'src/entity';
import { CreateUserPermissionDto } from './dto/create-user_permission.dto';
import { UpdateUserPermissionDto } from './dto/update-user_permission.dto';

@Injectable()
export class UserPermissionService {
  constructor(@InjectModel(UserPermission) private userPermissionRepository: typeof UserPermission) { }
  
  async create(createUserPermissionDto: CreateUserPermissionDto) {
    return await this.userPermissionRepository.create(createUserPermissionDto)
  }

  async findAll() {
    return await this.userPermissionRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.userPermissionRepository.findOne({where: {id}, include: {all: true}})
  }

  async findByUserId(id: number) {
    return await this.userPermissionRepository.findAll({where: {user_id: id}, include: {all: true}})
  }

  async update(id: number, updateUserPermissionDto: UpdateUserPermissionDto) {
    return await this.userPermissionRepository.update(updateUserPermissionDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.userPermissionRepository.destroy({where: {id}})
  }
}
