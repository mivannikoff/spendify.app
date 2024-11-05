import { Controller, Get } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReportsService } from './reports.service';

// Todo: Переименовать в report
@ApiTags('Reports')
@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @ApiResponse({
    description: 'Получение аналитики',
    // type: '',
    // isArray: true,
  })
  @Get()
  chart(): Promise<any> {
    return this.reportsService.chart();
  }
}
