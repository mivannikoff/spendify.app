import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';

import { AuthMiddleware } from '@/middlewares/auth.middleware';

import { AuthModule } from './resources/auth/auth.module';
import { ReportsModule } from './resources/reports/reports.module';
import { CategoriesModule } from './resources/categories/categories.module';
import { ExpensesModule } from './resources/expenses/expenses.module';
import { IncomesModule } from './resources/incomes/incomes.module';
import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

@Module({
  imports: [
    AuthModule,
    ReportsModule,
    CategoriesModule,
    ExpensesModule,
    IncomesModule,
  ],
  controllers: [],
  providers: [PocketBaseService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: '/categories', method: RequestMethod.ALL },
        { path: '/expenses', method: RequestMethod.ALL },
        { path: '/incomes', method: RequestMethod.ALL },
        { path: '/reports', method: RequestMethod.ALL },
      );
  }
}
