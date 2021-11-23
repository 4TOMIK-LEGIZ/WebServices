import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { RegisterlegalConsultationRequestDto } from "../application/dtos/register-consultation-request.dto";
import { RegisterlegalConsultationResponseDto } from "../application/dtos/register-consultation-response.dto";
import {Body, Controller, Post, Res} from "@nestjs/common";
import {Result} from "typescript-result";
import {legalConsultationApplicationService} from "../application/services/consultation-application.service";


@Controller('legalConsultation')
export class legalConsultationController {
  constructor(
    private readonly legalConsultationApplicationService: legalConsultationApplicationService,
  ) {}

  @Post()
  async register(
    @Body() registerlegalConsultationRequestDto: RegisterlegalConsultationRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterlegalConsultationResponseDto>
          = await this.legalConsultationApplicationService.register(registerlegalConsultationRequestDto);
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


