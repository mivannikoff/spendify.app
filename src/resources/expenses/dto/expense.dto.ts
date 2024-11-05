import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from '@/resources/categories/dto';

export class ExpenseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: CategoryDto;

  @ApiProperty()
  amount: number;

  @ApiProperty()
  date: string;

  @ApiProperty()
  created: string;

  @ApiProperty()
  updated: string;
}
