import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

const pb = new PocketBase('https://pocketbase.spendify.ru/');

@Injectable()
export class PocketBaseService {
  public readonly pb: typeof PocketBase;

  constructor() {
    this.pb = pb;
  }
}
