import { HttpException, Injectable } from '@nestjs/common';
import * as dayjs from 'dayjs';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import { groupExpensesByDate } from '../../utils';

import {
  CreatedExpensesDto,
  CreateExpensesDto,
  ExpenseCategoryDto,
  GetAllExpensesDto,
  PaginatedExpensesDto,
} from './dto';

@Injectable()
export class ExpensesService {
  constructor(private readonly pocketBaseService: PocketBaseService) {}

  async findAll({
    page = 1,
    perPage = 30,
  }: GetAllExpensesDto): Promise<PaginatedExpensesDto> {
    const result = await this.pocketBaseService.pb
      .collection('expenses')
      .getList(page, perPage, {
        expand: 'category_id',
        sort: '-date,-created',
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    console.log(result);

    const dates = result?.items?.map((item) => new Date(item.date));

    const startDateExtended = dayjs(new Date(Math.min(...dates)))
      .subtract(1, 'day')
      .toISOString();
    const endDateExtended = dayjs(new Date(Math.max(...dates)))
      .add(1, 'day')
      .toISOString();

    const resultByDate = await this.pocketBaseService.pb
      .collection('expenses')
      .getFullList({
        filter: `date >= "${startDateExtended}" && date <= "${endDateExtended}"`,
        sort: '-date,-created',
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return {
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      items: groupExpensesByDate(result.items, resultByDate),
    };
  }

  async categories(): Promise<ExpenseCategoryDto> {
    const startOfMonth = dayjs()
      .startOf('month')
      .subtract(1, 'day')
      .toISOString();
    const endOfMonth = dayjs().endOf('month').add(1, 'day').toISOString();

    // Todo: Заюзать categories.service.ts
    const categories = await this.pocketBaseService.pb
      .collection('categories')
      .getFullList();

    const categoryExpenses = categories.map((category) => ({
      id: category.id,
      category: category.name,
      totalAmount: 0,
    }));

    const expenses = await this.pocketBaseService.pb
      .collection('expenses')
      .getFullList({
        filter: `date >= "${startOfMonth}" && date <= "${endOfMonth}"`,
        expand: 'category_id',
      });

    expenses.forEach((expense) => {
      const categoryId = expense.expand.category_id.id;
      const amount = expense.amount;

      const category = categoryExpenses.find((cat) => cat.id === categoryId);

      if (category) {
        category.totalAmount += amount;
      }
    });

    const totalExpenses = categoryExpenses.reduce(
      (total, category) => total + category.totalAmount,
      0,
    );

    const categoryExpensesWithPercentage = categoryExpenses
      .map((category) => {
        const percentage =
          totalExpenses > 0 ? (category.totalAmount / totalExpenses) * 100 : 0;

        return {
          ...category,
          totalAmount: parseFloat(category.totalAmount.toFixed(2)),
          percentage: parseFloat(percentage.toFixed(2)),
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);

    return categoryExpensesWithPercentage;
  }

  async create(params: CreateExpensesDto): Promise<CreatedExpensesDto> {
    const userId = await this.pocketBaseService.pb.authStore?.model?.id;

    const result = await this.pocketBaseService.pb
      .collection('expenses')
      .create(
        {
          ...params,
          user_id: userId,
        },
        { expand: 'category_id' },
      )
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return {
      description: result.description,
      amount: result.amount,
      date: result.date,
      category: {
        id: result.expand.category_id.id,
        name: result.expand.category_id.name,
        created: result.expand.category_id.created,
        updated: result.expand.category_id.updated,
      },
      created: result.created,
      updated: result.updated,
    };
  }

  async delete(id: string): Promise<boolean> {
    return await this.pocketBaseService.pb
      .collection('expenses')
      .delete(id)
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });
  }
}
