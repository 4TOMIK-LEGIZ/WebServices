import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import {Body, Controller, Post, Res} from "@nestjs/common";
import {Result} from "typescript-result";
import {RegisterCustomContractRequestDto} from "../application/dtos/request/register-contract-request.dto";
import {RegisterCustomContractResponseDto} from "../application/dtos/response/register-contract-response.dto";
import {CustomContractApplicationService} from "../application/services/contract-application.service";


@Controller('customContract')
export class CustomContractController {
  constructor(
    private readonly customContractApplicationService: CustomContractApplicationService,
  ) {}

  @Post()
  async register(
    @Body() registerCustomContractRequestDto: RegisterCustomContractRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterCustomContractResponseDto>
          = await this.customContractApplicationService.register(registerCustomContractRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      console.log(error);
      return ApiController.serverError(response);
    }
  }
}


