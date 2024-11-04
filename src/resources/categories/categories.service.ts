import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

import { CategoryDto } from '@/resources/categories/dto';

const pb = new PocketBase('https://api.spendify.ivannikoff.ru/');

@Injectable()
export class CategoriesService {
  async findAll(): Promise<CategoryDto[]> {
    const result = await pb.collection('categories').getFullList({
      sort: 'name',
    });

    return result.map((category: CategoryDto) => ({
      id: category.id,
      name: category.name,
      created: category.created,
      updated: category.updated,
    }));
  }
}
