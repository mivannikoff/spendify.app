import { ApiProperty } from '@nestjs/swagger';

import { User } from '@/dto';

export class SignUpDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  passwordConfirm: string;
}

export class SignUpResponseDto extends User {}

export class SignUpError400Dto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: 'Failed to create record.',
    examples: ['Failed to create record.', 'Failed to authenticate.'],
  })
  message: string;
}

export class SignUpError403Dto {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({ example: 'You are not allowed to perform this request.' })
  message: string;
}
