import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserSpecPermission } from 'src/entity';
import { CreateUserSpecPermissionDto } from './dto/create-user_spec_permission.dto';
import { UpdateUserSpecPermissionDto } from './dto/update-user_spec_permission.dto';

@Injectable()
export class UserSpecPermissionService {
  constructor(@InjectModel(UserSpecPermission) private userSpecPermissionRepository: typeof UserSpecPermission ) {}

  // create user permission for specialist 
  async create(createUserSpecPermissionDto: CreateUserSpecPermissionDto) {
    let time = Date.now();
    time += +createUserSpecPermissionDto.expire_time
    return await this.userSpecPermissionRepository.create({...createUserSpecPermissionDto, expire_time: time+""})
  }
  
  //finad all permissions
  async findAll() {
    return await this.userSpecPermissionRepository.findAll()
  }

  // find One permission by id
  async findOne(id: number) {
    return await this.userSpecPermissionRepository.findOne({where: {id}})
  }

  // find specialist permission by user end spesialist id
  async findBySpecId(spec_id: number, user_id: number) {
    const user_spec = await this.userSpecPermissionRepository.findOne({where: {spec_id, user_id}})
    if (!user_spec) {
      throw new HttpException("You have not permission", HttpStatus.BAD_REQUEST)
    }
    const date = new Date().getTime()
    if (date > +user_spec.expire_time) {
      await this.userSpecPermissionRepository.destroy({where: {id: user_spec.id}})
      throw new HttpException("You have not permission", HttpStatus.BAD_REQUEST)
    }
    return user_spec
  }

  // find by id all user permission for only one user
  async findOnlyUserPermissions(id: number) {
    return await this.userSpecPermissionRepository.findAll({where: {user_id: id}})
  }

  // update permission
  async update(id: number, updateUserSpecPermissionDto: UpdateUserSpecPermissionDto) {
    return await this.userSpecPermissionRepository.update(updateUserSpecPermissionDto, {where: {id}})
  }

  // delete permission
  async remove(id: number) {
    return await this.userSpecPermissionRepository.destroy({where: {id}})
  }
  
}