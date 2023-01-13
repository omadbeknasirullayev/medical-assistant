import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UserDate } from 'src/entity';
import { CreateUserDateDto } from './dto/create-user_date.dto';
import { UpdateUserDateDto } from './dto/update-user_date.dto';

@Injectable()
export class UserDateService {
  constructor(@InjectModel(UserDate) private userDateRepository: typeof UserDate) { }
  
  async create(createUserDateDto: CreateUserDateDto) {
    return await this.userDateRepository.create(createUserDateDto)
  }

  async findAll() {
    return await this.userDateRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return await this.userDateRepository.findOne({where: {id}, include: {all: true}})
  }

  async update(id: number, updateUserDateDto: UpdateUserDateDto) {
    return await this.userDateRepository.update(updateUserDateDto, {where: {id}})
  }

  async remove(id: number) {
    return await this.userDateRepository.destroy({where: {id}})
  }
}
