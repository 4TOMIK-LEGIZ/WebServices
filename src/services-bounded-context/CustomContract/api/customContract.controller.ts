import { ApiController } from "src/common/api/api.controller";
import { Controller, Post, Body, Res } from '@nestjs/common';
import {Result} from "typescript-result";
import { QueryBus } from '@nestjs/cqrs';
import {RegisterCustomContractRequestDto} from "../application/dtos/request/register-contract-request.dto";
import {RegisterCustomContractResponseDto} from "../application/dtos/response/register-contract-response.dto";
import {AppNotification} from "../../../common/application/app.notification";
import {CustomContractsApplicationService} from "../application/services/custom-contracts-application.service";


@Controller('contract')
export class CustomContractController {
  constructor(
    private readonly customContractApplicationService: CustomContractsApplicationService,
    private readonly queryBus: QueryBus
  ) {}

  @Post()
  async register(
    @Body() registerCustomContractRequestDto: RegisterCustomContractRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCustomContractResponseDto> =
          await this.customContractApplicationService.register(
              registerCustomContractRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}


