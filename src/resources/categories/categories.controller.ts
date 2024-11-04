import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto } from '@/resources/categories/dto';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiResponse({
    description: 'Получение списка категорий',
    type: CategoryDto,
    isArray: true,
  })
  @Get()
  findAll(): Promise<CategoryDto[]> {
    return this.categoriesService.findAll();
  }
}
