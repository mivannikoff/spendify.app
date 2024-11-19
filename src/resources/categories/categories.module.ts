import { Module } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';

@Module({
  imports: [],
  controllers: [CategoriesController],
  providers: [CategoriesService, PocketBaseService],
})
export class CategoriesModule {}
