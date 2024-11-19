import { ApiProperty } from '@nestjs/swagger';

export class RefreshResponseDto {
  @ApiProperty()
  accessToken: string;
}

export class RefreshError401Dto {
  @ApiProperty({ example: 401 })
  statusCode: number;

  @ApiProperty({
    example: 'The request requires valid record authorization token to be set.',
  })
  message: string;
}

export class RefreshError403Dto {
  @ApiProperty({ example: 403 })
  statusCode: number;

  @ApiProperty({
    example:
      'The authorized record model is not allowed to perform this action.',
  })
  message: string;
}

export class RefreshError404Dto {
  @ApiProperty({ example: 404 })
  statusCode: number;

  @ApiProperty({
    example: 'Missing auth record context.',
  })
  message: string;
}
