import { ApiProperty } from '@nestjs/swagger';

import { PaginationDto } from '@/dto';
import { IncomeDto } from './income.dto';

export class AllDataDto {
  @ApiProperty()
  date: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty({ isArray: true, type: () => IncomeDto })
  data: Array<
    {
      source: string;
    } & Pick<IncomeDto, 'id' | 'description' | 'amount'>
  >;
}

export class PaginatedIncomesDto extends PaginationDto {
  @ApiProperty({ isArray: true, type: () => AllDataDto })
  items: AllDataDto[];
}
