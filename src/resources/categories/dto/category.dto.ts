import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  created: string;

  @ApiProperty()
  updated: string;
}
