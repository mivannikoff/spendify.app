import { Module } from '@nestjs/common';

import { ReportsModule } from './resources/reports/reports.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ExpensesModule } from './resources/expenses/expenses.module';
import { IncomesModule } from './resources/incomes/incomes.module';

@Module({
  imports: [ReportsModule, CategoriesModule, ExpensesModule, IncomesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
