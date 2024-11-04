import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

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
      sort: '-created',
    });

    return {
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      items: groupExpensesByDate(result.items),
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
