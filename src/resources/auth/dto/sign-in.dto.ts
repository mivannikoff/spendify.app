import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { Token, User } from '@/dto';

export class SignInDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class SignInResponseDto {
  @ApiProperty()
  user: User;

  @ApiProperty()
  token: Token;
}

export class SignInError400Dto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({ example: 'Failed to authenticate.' })
  message: string;
}
