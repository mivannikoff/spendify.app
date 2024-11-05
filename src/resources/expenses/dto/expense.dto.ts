import { ApiProperty } from '@nestjs/swagger';

import { CategoryDto } from '../../categories/dto/category.dto';

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
