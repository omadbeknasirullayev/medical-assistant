import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Recipe } from 'src/entity';

@ApiTags('Recipe')
@Controller('recipe')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @ApiOperation({ summary: "create recipe" })
  @ApiResponse({ status: 200, type: Recipe })
  @Post()
  create(@Body() createRecipeDto: CreateRecipeDto) {
    return this.recipeService.create(createRecipeDto);
  }
  
  @ApiOperation({ summary: "Find all recipe" })
  @ApiResponse({ status: 200, type: [Recipe] })
  @Get()
  findAll() {
    return this.recipeService.findAll();
  }
  
  @ApiOperation({ summary: "Find One recipe" })
  @ApiResponse({ status: 200, type: Recipe })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.recipeService.findOne(+id);
  }
  
  @ApiOperation({ summary: "Update recipe" })
  @ApiResponse({ status: 200, type: Recipe })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecipeDto: UpdateRecipeDto) {
    return this.recipeService.update(+id, updateRecipeDto);
  }
  
  @ApiOperation({ summary: "Remove recipe" })
  @ApiResponse({ status: 200, type: Recipe })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recipeService.remove(+id);
  }
}
