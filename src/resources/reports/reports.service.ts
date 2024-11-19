import { Injectable } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';
import { ExpensesService } from '@/resources/expenses/expenses.service';

import { calculateTotalAmount } from '@/utils';

@Injectable()
export class ReportsService {
  constructor(
    private readonly pocketBaseService: PocketBaseService,
    private readonly expensesService: ExpensesService,
  ) {}

  async chart(): Promise<any> {
    const categories = await this.expensesService.findByCategories();

    const totalAmount = calculateTotalAmount(categories);

    const result = await this.pocketBaseService.pb
      .collection('incomes')
      .getFullList();

    const allBudget = result.reduce((total, income) => {
      return total + income.amount;
    }, 0);

    const remainingBudget = parseFloat((allBudget - totalAmount).toFixed(2));

    // Todo: Вынести в отдельную сущность;
    const resultGoals = await this.pocketBaseService.pb
      .collection('goals')
      .getFullList('');

    return {
      categories,
      totalAmount,
      remainingBudget,
      goal: remainingBudget - resultGoals?.[0]?.target_amount,
      goal1: remainingBudget - resultGoals?.[1]?.target_amount,
      goal2: remainingBudget - resultGoals?.[2]?.target_amount,
    };
  }
}
