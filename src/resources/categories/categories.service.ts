import { Injectable, HttpException } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';
import { CategoryDto } from '@/resources/categories/dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly pocketBaseService: PocketBaseService) {}

  async findAll(): Promise<CategoryDto[]> {
    const result = await this.pocketBaseService.pb
      .collection('categories')
      .getFullList({
        sort: 'name',
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return result.map((category: CategoryDto) => ({
      id: category.id,
      name: category.name,
      created: category.created,
      updated: category.updated,
    }));
  }
}
