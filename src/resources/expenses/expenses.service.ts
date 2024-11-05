import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');
import * as dayjs from 'dayjs';

import { groupExpensesByDate } from '../../utils';

import {
  GetAllExpensesDto,
  PaginatedExpensesDto,
  CreateExpensesDto,
  CreatedExpensesDto,
} from './dto';

const pb = new PocketBase('https://api.spendify.ivannikoff.ru/');

@Injectable()
export class ExpensesService {
  async findAll({
    page = 1,
    perPage = 30,
  }: GetAllExpensesDto): Promise<PaginatedExpensesDto> {
    const result = await pb.collection('expenses').getList(page, perPage, {
      expand: 'category_id',
      sort: '-date',
    });

    const dates = result?.items?.map((item) => new Date(item.date));
    const startDate = new Date(Math.min(...dates)).toISOString().slice(0, 10);
    const endDate = new Date(Math.max(...dates)).toISOString().slice(0, 10);

    const startDateExtended = dayjs(startDate)
      .subtract(1, 'day')
      .toISOString()
      .slice(0, 10);
    const endDateExtended = dayjs(endDate)
      .add(1, 'day')
      .toISOString()
      .slice(0, 10);

    const result1 = await pb.collection('expenses').getFullList({
      expand: 'category_id',
      filter: `date >= "${startDateExtended}T00:00:00Z" && date <= "${endDateExtended}T23:59:59Z"`,
      sort: '-date',
    });

    // @ts-ignore
    const totalAmountsByDate = result1.reduce<Record<string, number>>(
      (acc, expense) => {
        const date = dayjs(expense.date).format('DD MMMM YYYY');
        acc[date] = (acc[date] || 0) + expense.amount;
        return acc;
      },
      {},
    );

    return {
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      items: groupExpensesByDate(result.items, totalAmountsByDate),
    };
  }

  async create(params: CreateExpensesDto): Promise<CreatedExpensesDto> {
    const result = await pb.collection('expenses').create(
      {
        ...params,
        user_id: 'halzy88edbp6dr2',
      },
      { expand: 'category_id' },
    );

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
}
