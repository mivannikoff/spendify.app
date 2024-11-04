import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ExpensesService } from './expenses.service';
import { CreateExpensesDto } from './dto';

@ApiTags('Expenses')
@Controller('expenses')
export class ExpensesController {
  constructor(private readonly expensesService: ExpensesService) {}

  @Get()
  findAll(): Promise<any> {
    return this.expensesService.findAll();
  }

  @Post()
  create(@Body() createExpensesDto: CreateExpensesDto): Promise<any> {
    return this.expensesService.create(createExpensesDto);
  }
}
