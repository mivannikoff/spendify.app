import { ApiProperty } from '@nestjs/swagger';

export class ExpenseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  amount: number;
}
