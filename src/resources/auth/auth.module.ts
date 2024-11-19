import { Module } from '@nestjs/common';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [PocketBaseService, AuthService],
})
export class AuthModule {}
