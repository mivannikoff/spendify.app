import { Module } from '@nestjs/common';
import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';
import { IncomesController } from './incomes.controller';
import { IncomesService } from './incomes.service';

@Module({
  imports: [],
  controllers: [IncomesController],
  providers: [PocketBaseService, IncomesService],
})
export class IncomesModule {}
