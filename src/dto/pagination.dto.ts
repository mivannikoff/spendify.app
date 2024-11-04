import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional } from 'class-validator';

export class PaginationDto {
  @ApiProperty()
  page: number;

  @ApiProperty()
  perPage: number;

  @ApiProperty()
  totalItems: number;

  @ApiProperty()
  totalPages: number;
}

export class PaginationParamsDto {
  @ApiProperty({ nullable: true, type: 'number', required: false, default: 1 })
  @IsNumberString()
  @IsOptional()
  page?: number;

  @ApiProperty({ nullable: true, type: 'number', required: false, default: 30 })
  @IsNumberString()
  @IsOptional()
  perPage?: number;
}
