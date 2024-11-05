import { ApiProperty } from '@nestjs/swagger';

export class ExpenseCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  totalAmount: number;
}
