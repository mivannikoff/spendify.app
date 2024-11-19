import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { jwtDecode } from 'jwt-decode';

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly pocketBaseService: PocketBaseService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Токен не предоставлен');
    }

    const decodedData = jwtDecode(token);

    try {
      await this.pocketBaseService.pb.authStore.save(token, decodedData);
      await this.pocketBaseService.pb.authStore.model;

      if (!(await this.pocketBaseService.pb.authStore.isValid)) {
        throw new UnauthorizedException('Недействительный токен');
      }

      next();
    } catch (err) {
      throw new UnauthorizedException('Недействительный токен');
    }
  }
}
