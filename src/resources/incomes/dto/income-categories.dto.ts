import { ApiProperty } from '@nestjs/swagger';

export class IncomeCategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  category: string;

  @ApiProperty()
  totalAmount: number;

  @ApiProperty()
  percentage: number;
}
