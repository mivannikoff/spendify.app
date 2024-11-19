import { Module } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import { ExpensesController } from './expenses.controller';
import { ExpensesService } from './expenses.service';

@Module({
  imports: [],
  controllers: [ExpensesController],
  providers: [ExpensesService, PocketBaseService],
})
export class ExpensesModule {}
