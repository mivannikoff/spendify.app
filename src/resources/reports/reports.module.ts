import { Module } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ExpensesService } from '../expenses/expenses.service';

@Module({
  imports: [],
  controllers: [ReportsController],
  providers: [PocketBaseService, ReportsService, ExpensesService],
})
export class ReportsModule {}
