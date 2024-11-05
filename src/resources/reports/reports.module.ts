import { Module } from '@nestjs/common';
import { ReportsController } from './reports.controller';
import { ReportsService } from './reports.service';
import { ExpensesService } from '../expenses/expenses.service';

@Module({
  imports: [],
  controllers: [ReportsController],
  providers: [ReportsService, ExpensesService],
})
export class ReportsModule {}
