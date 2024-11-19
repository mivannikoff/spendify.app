import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Query,
  Param,
} from '@nestjs/common';
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { ExpensesService } from './expenses.service';
import {
  GetAllExpensesDto,
  PaginatedExpensesDto,
  CreateExpensesDto,
  CreatedExpensesDto,
  ExpenseDto,
  ExpenseCategoryDto,
  GetAllExpensesByCategoryDto,
  PaginatedExpensesByCategoryDto,
} from './dto';

@ApiBearerAuth()
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
    description: 'Получение суммы расходов по категориям',
    type: ExpenseCategoryDto,
    isArray: true,
  })
  @Get('/categories')
  findByCategories(): Promise<ExpenseCategoryDto> {
    return this.expensesService.findByCategories();
  }

  @ApiResponse({
    description: 'Получение списка расходов по категории',
    type: ExpenseCategoryDto,
    isArray: true,
  })
  @Get('/category/:categoryId')
  findByCategory(
    @Param('categoryId') categoryId: string,
    @Query() params: GetAllExpensesByCategoryDto,
  ): Promise<PaginatedExpensesByCategoryDto> {
    return this.expensesService.findByCategory(categoryId, params);
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
