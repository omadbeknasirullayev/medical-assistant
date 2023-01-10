import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from '../entity/district.entity';

@Injectable()
export class DistrictService {
  constructor(@InjectModel(District) private districtRepository: typeof District) {}

  // create
  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtRepository.create(createDistrictDto)
    return {message: "Successfully added", info: district}
  }

  // findAll
  async findAll() {
    const districts = await this.districtRepository.findAll()
    return districts
  
}

//findOne
async findOne(id: number) {
  const district = await this.districtRepository.findOne({where: {id}})    
  if (!district) {
    throw new NotFoundException('No such district exists');
  }
  return district;
}

// update
async update(id: number, updateDistrictDto: UpdateDistrictDto) {
  const district = await this.districtRepository.findOne({where: {id}})    
  if (!district) {
    throw new NotFoundException('No such district exists');
  }
  const updated = await this.districtRepository.update(updateDistrictDto, {where: {id}})
  return {message: "Successfully updated", count: updated}
}

// remove
async remove(id: number) {
    const deleted = await this.districtRepository.destroy({where: {id}})
    return {message: "Successfully removed", count: deleted}
  }
}