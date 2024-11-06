import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

import { IncomesService } from './incomes.service';
import {
  GetAllIncomesDto,
  PaginatedIncomesDto,
  CreateIncomeDto,
  CreatedIncomeDto,
  IncomeDto,
  IncomeCategoryDto,
} from './dto';

@ApiTags('Incomes')
@Controller('incomes')
export class IncomesController {
  constructor(private readonly incomesService: IncomesService) {}

  @ApiResponse({
    description: 'Получение списка доходов по датам',
    type: PaginatedIncomesDto,
  })
  @Get()
  findAll(@Query() params: GetAllIncomesDto): Promise<PaginatedIncomesDto> {
    return this.incomesService.findAll(params);
  }

  @ApiResponse({
    description: 'Получение суммы доходов по категориям',
    type: IncomeCategoryDto,
    isArray: true,
  })
  @Get('/categories')
  categories(): Promise<IncomeCategoryDto> {
    return this.incomesService.categories();
  }

  @ApiResponse({
    description: 'Добавление дохода',
    type: CreatedIncomeDto,
  })
  @Post()
  create(@Body() createIncomeDto: CreateIncomeDto): Promise<CreatedIncomeDto> {
    return this.incomesService.create(createIncomeDto);
  }

  @ApiResponse({
    description: 'Удаление дохода',
    type: IncomeDto,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.incomesService.delete(id);
  }
}
