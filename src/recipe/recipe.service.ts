import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Recipe } from 'src/entity';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';

@Injectable()
export class RecipeService {
  constructor(@InjectModel(Recipe) private recipeRepository: typeof Recipe) { }
  
  async create(createRecipeDto: CreateRecipeDto) {
    return await this.recipeRepository.create(createRecipeDto)
  }

  async findAll() {
    return await this.recipeRepository.findAll({include: {all: true}})
  }

  async findOne(id: number) {
    return `This action returns a #${id} recipe`;
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    return `This action updates a #${id} recipe`;
  }

  async remove(id: number) {
    return `This action removes a #${id} recipe`;
  }
}
