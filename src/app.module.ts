import { Module } from '@nestjs/common';

import { ReportsModule } from './resources/reports/reports.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ExpensesModule } from './resources/expenses/expenses.module';

@Module({
  imports: [ReportsModule, CategoriesModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
