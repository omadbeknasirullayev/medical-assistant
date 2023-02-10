import { Module } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { RecipeController } from './recipe.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Recipe } from 'src/entity';

@Module({
  imports: [SequelizeModule.forFeature([Recipe])],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
