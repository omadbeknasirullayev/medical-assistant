import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SpecDate } from 'src/entity';
import { FilesService } from 'src/files/files.service';
import { CreateSpecDateDto } from './dto/create-spec_date.dto';
import { UpdateSpecDateDto } from './dto/update-spec_date.dto';

@Injectable()
export class SpecDateService {
  constructor(@InjectModel(SpecDate) private specDateRepository: typeof SpecDate,
  readonly fileService: FilesService) { }

  async create(createSpecDateDto: CreateSpecDateDto) {
    return await this.specDateRepository.create(createSpecDateDto)
  }

  async findAll() {
    return await this.specDateRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return `This action returns a #${id} specDate`;
  }

  async update(id: number, updateSpecDateDto: UpdateSpecDateDto) {
    return `This action updates a #${id} specDate`;
  }

  async remove(id: number) {
    return `This action removes a #${id} specDate`;
  }
}
