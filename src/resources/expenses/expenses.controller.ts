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

import { ExpensesService } from './expenses.service';
import {
  GetAllExpensesDto,
  PaginatedExpensesDto,
  CreateExpensesDto,
  CreatedExpensesDto,
  ExpenseDto,
} from './dto';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @ApiResponse({
    description: 'Получение списка расходов по датам',
    type: PaginatedExpensesDto,
  })
  @Get()
  findAll(@Query() params: GetAllExpensesDto): Promise<PaginatedExpensesDto> {
    return this.expensesService.findAll(params);
  }

  @ApiResponse({
    description: 'Добавление расходов',
    type: CreatedExpensesDto,
  })
  @Post()
  create(
    @Body() createExpensesDto: CreateExpensesDto,
  ): Promise<CreatedExpensesDto> {
    return this.expensesService.create(createExpensesDto);
  }

  @ApiResponse({
    description: 'Удаление расходов',
    type: ExpenseDto,
  })
  @Delete(':id')
  delete(@Param('id') id: string): Promise<boolean> {
    return this.expensesService.delete(id);
  }
}
