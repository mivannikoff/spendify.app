import { Controller, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';
import {
  SignInDto,
  SignInError400Dto,
  SignInResponseDto,
  RefreshResponseDto,
  SignUpDto,
  SignUpResponseDto,
  SignUpError400Dto,
  SignUpError403Dto,
  RequestVerificationDto,
  RequestVerificationResponseDto,
  RequestVerificationError400Dto,
  RefreshError401Dto,
  RefreshError403Dto,
  RefreshError404Dto,
  ConfirmVerificationDto,
  RequestPasswordResetDto,
  ConfirmPasswordResetDto,
} from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    description: 'Failed to authenticate.',
    type: SignInError400Dto,
    status: 400,
  })
  @ApiResponse({
    description: 'Successful authorization using email and password.',
    type: SignInResponseDto,
    status: 200,
  })
  @Post('sign-in')
  signIn(@Body() signInDto: SignInDto): Promise<SignInResponseDto> {
    return this.authService.signIn(signInDto);
  }

  @ApiResponse({
    description: 'Missing auth record context.',
    type: RefreshError404Dto,
    status: 404,
  })
  @ApiResponse({
    description:
      'The authorized record model is not allowed to perform this action.',
    type: RefreshError403Dto,
    status: 403,
  })
  @ApiResponse({
    description:
      'The request requires valid record authorization token to be set.',
    type: RefreshError401Dto,
    status: 401,
  })
  @ApiResponse({
    description: 'Successful token update.',
    type: RefreshResponseDto,
    status: 200,
  })
  @ApiBearerAuth()
  @Post('refresh')
  refresh(): Promise<RefreshResponseDto> {
    return this.authService.refresh();
  }

  @ApiResponse({
    description: 'An error occurred while validating the form.',
    type: RequestVerificationError400Dto,
    status: 400,
  })
  @ApiResponse({
    description: 'Request for email confirmation.',
    type: RequestVerificationResponseDto,
    status: 201,
  })
  @Post('request-verification')
  requestVerification(
    @Body() requestVerificationDto: RequestVerificationDto,
  ): Promise<RequestVerificationResponseDto> {
    return this.authService.requestVerification(requestVerificationDto);
  }

  @ApiResponse({
    description: 'You are not allowed to perform this request.',
    type: SignUpError403Dto,
    status: 403,
  })
  @ApiResponse({
    description: 'Failed to create record/Failed to authenticate',
    type: SignUpError400Dto,
    status: 400,
    // content: {
    //   'application/json': {
    //     examples: {
    //       failedCreate: {
    //         summary: 'Failed to create record',
    //         value: { message: 'Failed to create record.' },
    //       },
    //       failedAuth: {
    //         summary: 'Failed to authenticate',
    //         value: { message: 'Failed to authenticate.' },
    //       },
    //     },
    //   },
    // },
  })
  @ApiResponse({
    description: 'Successful registration.',
    type: SignUpResponseDto,
    status: 200,
  })
  @Post('sign-up')
  signUp(@Body() signUpDto: SignUpDto): Promise<SignUpResponseDto> {
    return this.authService.signUp(signUpDto);
  }

  @ApiResponse({
    description: "Подтверждение email'a",
    type: ConfirmVerificationDto,
  })
  @Post('confirm-verification')
  confirmVerification(): Promise<ConfirmVerificationDto> {
    return this.authService.confirmVerification();
  }

  @ApiResponse({
    description: 'Запрос на сброс пароля',
    type: ConfirmVerificationDto,
  })
  @Post('request-password-reset')
  requestPasswordReset(): Promise<RequestPasswordResetDto> {
    return this.authService.requestPasswordReset();
  }

  @ApiResponse({
    description: 'Сохранение нового пароля',
    type: ConfirmVerificationDto,
  })
  @Post('confirm-password-reset')
  confirmPasswordReset(): Promise<ConfirmPasswordResetDto> {
    return this.authService.confirmPasswordReset();
  }
}
