import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/dto';
import { ExpenseDto } from './expense.dto';

export class AllDataDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ isArray: true, type: () => ExpenseDto })
  data: ExpenseDto[];
}

export class PaginatedExpensesDto extends PaginationDto {
  @ApiProperty({ isArray: true, type: () => AllDataDto })
  items: AllDataDto[];
}
