import { Module } from '@nestjs/common';

import { ExpensesModule } from './resources/expense/expenses.module';

@Module({
  imports: [ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
