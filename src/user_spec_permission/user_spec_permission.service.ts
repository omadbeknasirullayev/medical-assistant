import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSpecPermission } from 'src/entity';
import { CreateUserSpecPermissionDto } from './dto/create-user_spec_permission.dto';
import { UpdateUserSpecPermissionDto } from './dto/update-user_spec_permission.dto';

@Injectable()
export class UserSpecPermissionService {
  constructor(@InjectModel(UserSpecPermission) private userSpecPermissionRepository: typeof UserSpecPermission ) {}

  async create(createUserSpecPermissionDto: CreateUserSpecPermissionDto) {
    let time = new Date().getTime()
    time += +createUserSpecPermissionDto.end_date
    return await this.userSpecPermissionRepository.create({...createUserSpecPermissionDto, end_date: time+""})
  }

  async findAll() {
    return await this.userSpecPermissionRepository.findAll()
  }

  async findOne(id: number) {
    return await this.userSpecPermissionRepository.findOne({where: {id}})
  }

  async findBySpecId(spec_id: number, user_id: number) {
    const user_spec = await this.userSpecPermissionRepository.findOne({where: {spec_id, user_id}})
    if (!user_spec) {
      throw new HttpException("You have not permission", HttpStatus.BAD_REQUEST)
    }
    const date = new Date().getTime()
    if (date > +user_spec.end_date) {
      throw new HttpException("You have not permission", HttpStatus.BAD_REQUEST)
    }
  }


  async update(id: number, updateUserSpecPermissionDto: UpdateUserSpecPermissionDto) {
    // return await this.userSpecPermissionRepository.update(updateUserSpecPermissionDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.userSpecPermissionRepository.destroy({where: {id}})
  }
  
}

942871513