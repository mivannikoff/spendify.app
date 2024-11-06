import { ApiProperty } from '@nestjs/swagger';

export class IncomeSourceDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created: string;

  @ApiProperty()
  updated: string;
}
