import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from '../entity/region.entity';

@Injectable()
export class RegionService {
  constructor(@InjectModel(Region) private regionRepository: typeof Region) {}

  // create
  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepository.create(createRegionDto)
    return {message: "Successfully added", info: region}
  }

  // findAll
  async findAll() {
    const regions = await this.regionRepository.findAll({include: {all: true}})
    return regions
  }

  //FindOne
  async findOne(id: number) {
    const region = await this.regionRepository.findOne({where: {id}, include: {all: true}})    
    if (!region) {
      throw new NotFoundException('No such region exists');
    }
    return region;
  }

  // update
  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepository.findOne({where: {id}})    
    if (!region) {
      throw new NotFoundException('No such region exists');
    }
    const updated = await this.regionRepository.update(updateRegionDto, {where: {id}})
    return {message: "Successfully updated", count: updated}
  }

  // remove
  async remove(id: number) {
    const deleted = await this.regionRepository.destroy({where: {id}})
    return {message: "Successfully removed", count: deleted}
  }
}