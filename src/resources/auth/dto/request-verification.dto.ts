import { ApiProperty } from '@nestjs/swagger';

export class RequestVerificationDto {
  @ApiProperty()
  email: string;
}

export class RequestVerificationResponseDto {
  @ApiProperty()
  success: boolean;
}

export class RequestVerificationError400Dto {
  @ApiProperty({ example: 400 })
  statusCode: number;

  @ApiProperty({
    example: 'An error occurred while validating the form.',
  })
  message: string;
}
