import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Permission } from 'src/entity';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';

@Injectable()
export class PermissionService {
  constructor(@InjectModel(Permission) private permissionRepository: typeof Permission) { }
  
  async create(createPermissionDto: CreatePermissionDto) {
    return await this.permissionRepository.create(createPermissionDto)
  }

  async findAll() {
    return await this.permissionRepository.findAll()
  }

  async findOne(id: number) {
    return await this.permissionRepository.findOne({where: {id}})
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    return await this.permissionRepository.update(updatePermissionDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.permissionRepository.destroy({where: {id}})
  }
}
