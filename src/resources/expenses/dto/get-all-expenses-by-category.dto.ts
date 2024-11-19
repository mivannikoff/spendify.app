import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto, PaginationParamsDto } from '@/dto';

import { ExpenseDto } from './expense.dto';

export class GetAllExpensesByCategoryDto extends PaginationParamsDto {}

class AllDataDto {
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

export class PaginatedExpensesByCategoryDto extends PaginationDto {
  @ApiProperty({ isArray: true, type: () => AllDataDto })
  items: AllDataDto[];
}
