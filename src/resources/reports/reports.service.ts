import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// const PocketBase = require('pocketbase/cjs');

import { ExpensesService } from '@/resources/expenses/expenses.service';

import { calculateTotalAmount } from '@/utils';

// const pb = new PocketBase('https://api.spendify.ivannikoff.ru/');

@Injectable()
export class ReportsService {
  constructor(private readonly expensesService: ExpensesService) {}

  async chart(): Promise<any> {
    const categories = await this.expensesService.categories();

    const totalAmount = calculateTotalAmount(categories);

    return {
      categories,
      totalAmount,
    };
  }
}
