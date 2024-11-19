import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { CategoriesService } from './categories.service';
import { CategoryDto } from '@/resources/categories/dto';

@ApiBearerAuth()
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
