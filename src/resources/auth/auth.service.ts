import { HttpException, Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const PocketBase = require('pocketbase/cjs');

import { PocketBaseService } from '@/resources/pocketbase/pocketbase.service';

import {
  SignInDto,
  SignInResponseDto,
  RefreshResponseDto,
  SignUpResponseDto,
  RequestVerificationDto,
  RequestVerificationResponseDto,
  ConfirmVerificationDto,
  RequestPasswordResetDto,
  ConfirmPasswordResetDto,
} from './dto';

@Injectable()
export class AuthService {
  constructor(private readonly pocketBaseService: PocketBaseService) {}

  async signIn(signInDto: SignInDto): Promise<SignInResponseDto> {
    const result = await this.pocketBaseService.pb
      .collection('users')
      .authWithPassword(signInDto.email, signInDto.password)
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    const { record } = result;

    return {
      user: {
        id: record.id,
        name: record.name,
        email: record.email,
        created: record.created,
        updated: record.updated,
      },
      token: {
        accessToken: result.token,
      },
    };
  }

  async refresh(): Promise<RefreshResponseDto> {
    const result = await this.pocketBaseService.pb
      .collection('users')
      .authRefresh()
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return {
      accessToken: result.token,
    };
  }

  async requestVerification(
    requestVerificationDto: RequestVerificationDto,
  ): Promise<RequestVerificationResponseDto> {
    const result = await this.pocketBaseService.pb
      .collection('users')
      .requestVerification(requestVerificationDto.email)
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response, error.response.code);
      });

    return {
      success: !!result,
    };
  }

  async signUp(signUpDto: SignInDto): Promise<SignUpResponseDto> {
    const createdUserResult = await this.pocketBaseService.pb
      .collection('users')
      .create({
        ...signUpDto,
        emailVisibility: true,
      })
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    await this.pocketBaseService.pb
      .collection('users')
      .requestVerification(createdUserResult.email)
      .catch((error) => {
        console.log(error);

        throw new HttpException(error.response.message, error.response.code);
      });

    return {
      id: createdUserResult.id,
      name: createdUserResult.name,
      email: createdUserResult.email,
      created: createdUserResult.created,
      updated: createdUserResult.updated,
    };
  }

  async confirmVerification(): Promise<ConfirmVerificationDto> {
    return {};
  }

  async requestPasswordReset(): Promise<RequestPasswordResetDto> {
    return {};
  }

  async confirmPasswordReset(): Promise<ConfirmPasswordResetDto> {
    return {};
  }
}
