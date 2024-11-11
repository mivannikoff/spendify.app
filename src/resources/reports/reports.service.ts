import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

import { ExpensesService } from '@/resources/expenses/expenses.service';

import { calculateTotalAmount } from '@/utils';

const pb = new PocketBase('https://api.spendify.ivannikoff.ru/');

@Injectable()
export class ReportsService {
  constructor(private readonly expensesService: ExpensesService) {}

  async chart(): Promise<any> {
    const categories = await this.expensesService.categories();

    const totalAmount = calculateTotalAmount(categories);

    const result = await pb.collection('incomes').getFullList();

    const allBudget = result.reduce((total, income) => {
      return total + income.amount;
    }, 0);

    const remainingBudget = parseFloat((allBudget - totalAmount).toFixed(2));

    // Todo: Вынести в отдельную сущность;
    const resultGoals = await pb
      .collection('goals')
      .getFirstListItem('user_id = "halzy88edbp6dr2"');

    return {
      categories,
      totalAmount,
      remainingBudget,
      goal: remainingBudget - resultGoals.target_amount,
    };
  }
}
