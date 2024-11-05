import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/dto';
import { ExpenseDto } from './expense.dto';

export class AllDataDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ isArray: true, type: () => ExpenseDto })
  data: Array<
    {
      category: string;
    } & Pick<ExpenseDto, 'id' | 'description' | 'amount'>
  >;
}

export class PaginatedExpensesDto extends PaginationDto {
  @ApiProperty({ isArray: true, type: () => AllDataDto })
  items: AllDataDto[];
}
