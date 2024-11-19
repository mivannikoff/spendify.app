import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ReportsService } from './reports.service';

@ApiBearerAuth()
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
