import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import {Body, Controller, Post, Res} from "@nestjs/common";
import {Result} from "typescript-result";
import {RegisterLegalConsultationRequestDto} from "../application/dtos/register-consultation-request.dto";
import {RegisterLegalConsultationResponseDto} from "../application/dtos/register-consultation-response.dto";
import {LegalConsultationsApplicationService} from "../application/services/consultation-application.service";


@Controller('consultation')
export class legalConsultationController {
  constructor(
    private readonly legalConsultationsApplicationService: LegalConsultationsApplicationService,
  ) {}

  @Post()
  async register(
    @Body() registerLegalConsultationRequestDto: RegisterLegalConsultationRequestDto,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, RegisterLegalConsultationResponseDto>
          = await this.legalConsultationsApplicationService.register(
              registerLegalConsultationRequestDto);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      return ApiController.serverError(response, error);
    }
  }
}


