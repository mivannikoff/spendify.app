import { HttpException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');
import * as dayjs from 'dayjs';

import { groupIncomesByDate } from '../../utils';

import {
  CreatedIncomeDto,
  CreateIncomeDto,
  IncomeCategoryDto,
  GetAllIncomesDto,
  PaginatedIncomesDto,
} from './dto';

const pb = new PocketBase('https://api.spendify.ivannikoff.ru/');

@Injectable()
export class IncomesService {
  async findAll({
    page = 1,
    perPage = 30,
  }: GetAllIncomesDto): Promise<PaginatedIncomesDto> {
    const result = await pb
      .collection('incomes')
      .getList(page, perPage, {
        expand: 'source_id',
        sort: '-date,-created',
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    const dates = result?.items?.map((item) => new Date(item.date));

    const startDateExtended = dayjs(new Date(Math.min(...dates)))
      .subtract(1, 'day')
      .toISOString();
    const endDateExtended = dayjs(new Date(Math.max(...dates)))
      .add(1, 'day')
      .toISOString();

    const resultByDate = await pb
      .collection('incomes')
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
      items: groupIncomesByDate(result.items, resultByDate),
    };
  }

  async categories(): Promise<IncomeCategoryDto> {
    const startOfMonth = dayjs()
      .startOf('month')
      .subtract(1, 'day')
      .toISOString();
    const endOfMonth = dayjs().endOf('month').add(1, 'day').toISOString();

    const incomeSources = await pb.collection('income_sources').getFullList();

    const sourceIncomes = incomeSources.map((source) => ({
      id: source.id,
      category: source.name,
      totalAmount: 0,
    }));

    const incomes = await pb.collection('incomes').getFullList({
      filter: `date >= "${startOfMonth}" && date <= "${endOfMonth}"`,
      expand: 'source_id',
    });

    incomes.forEach((income) => {
      const categoryId = income.expand.source_id.id;
      const amount = income.amount;

      const source = sourceIncomes.find((cat) => cat.id === categoryId);

      if (source) {
        source.totalAmount += amount;
      }
    });

    const totalIncomes = sourceIncomes.reduce(
      (total, source) => total + source.totalAmount,
      0,
    );

    const sourceIncomesWithPercentage = sourceIncomes
      .map((source) => {
        const percentage =
          totalIncomes > 0 ? (source.totalAmount / totalIncomes) * 100 : 0;

        return {
          ...source,
          totalAmount: parseFloat(source.totalAmount.toFixed(2)),
          percentage: parseFloat(percentage.toFixed(2)),
        };
      })
      .sort((a, b) => b.totalAmount - a.totalAmount);

    return sourceIncomesWithPercentage;
  }

  async create(params: CreateIncomeDto): Promise<CreatedIncomeDto> {
    const result = await pb
      .collection('incomes')
      .create(
        {
          ...params,
          user_id: 'halzy88edbp6dr2',
        },
        { expand: 'source_id' },
      )
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return {
      description: result.description,
      amount: result.amount,
      date: result.date,
      source: {
        id: result.expand.source_id.id,
        name: result.expand.source_id.name,
        created: result.expand.source_id.created,
        updated: result.expand.source_id.updated,
      },
      created: result.created,
      updated: result.updated,
    };
  }

  async delete(id: string): Promise<boolean> {
    return await pb
      .collection('incomes')
      .delete(id)
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });
  }
}
