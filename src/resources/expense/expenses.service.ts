import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('http://127.0.0.1:8090');

@Injectable()
export class ExpensesService {
  async findAll(): Promise<any> {
    const result = await pb.collection('expenses').getFullList({
      expand: 'category_id',
      sort: '-created',
    });

    return result;
  }

  async create(params: any): Promise<any> {
    const result = await pb.collection('expenses').create(params);

    return result;
  }
}