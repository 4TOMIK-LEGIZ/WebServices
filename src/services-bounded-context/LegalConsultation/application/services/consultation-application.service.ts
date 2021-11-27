import { AppNotification } from "src/common/application/app.notification";
import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";
import {RegisterLegalConsultationValidator} from "../validators/register-consultation.validator";
import {RegisterLegalConsultationRequestDto} from "../dtos/register-consultation-request.dto";
import {RegisterLegalConsultationResponseDto} from "../dtos/register-consultation-response.dto";
import {RegisterLegalConsultationCommand} from "../commands/register-legal-consultation.command";


@Injectable()
export class LegalConsultationsApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerLegalConsultationValidator: RegisterLegalConsultationValidator,
  ) {}

  async register(
    registerLegalConsultationRequestDto: RegisterLegalConsultationRequestDto,
  ): Promise<Result<AppNotification, RegisterLegalConsultationResponseDto>> {
    const notification: AppNotification =
        await this.registerLegalConsultationValidator.validate(
        registerLegalConsultationRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerLegalConsultationCommand: RegisterLegalConsultationCommand = new RegisterLegalConsultationCommand(
      registerLegalConsultationRequestDto.lawDocument,
      registerLegalConsultationRequestDto.lawComment,
      registerLegalConsultationRequestDto.cost,
    );
    const legalConsultationId = await this.commandBus.execute(registerLegalConsultationCommand);
    const registerLegalConsultationResponseDto: RegisterLegalConsultationResponseDto =
        new RegisterLegalConsultationResponseDto(
      legalConsultationId,
      registerLegalConsultationRequestDto.lawDocument,
      registerLegalConsultationRequestDto.lawComment,
      registerLegalConsultationRequestDto.cost,
    );
    return Result.ok(registerLegalConsultationResponseDto);
  }
}
