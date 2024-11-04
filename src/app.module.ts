import { Module } from '@nestjs/common';

import { CategoriesModule } from './resources/categories/categories.module';
import { ExpensesModule } from './resources/expenses/expenses.module';

@Module({
  imports: [CategoriesModule, ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
