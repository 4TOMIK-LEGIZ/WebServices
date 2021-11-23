import { AppNotification } from "src/common/application/app.notification";
import { RegisterlegalConsultationCommand } from "../../messaging/register-consultation.command";
import { RegisterlegalConsultationRequestDto } from "../dtos/register-consultation-request.dto";
import { RegisterlegalConsultationResponseDto } from "../dtos/register-consultation-response.dto";
import { RegisterlegalConsultationValidator } from "../validators/register-consultation.validator";
import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";


@Injectable()
export class legalConsultationApplicationService {
  constructor(
    private commandBus: CommandBus,
    private registerlegalConsultationValidator: RegisterlegalConsultationValidator,
  ) {}

  async register(
    registerlegalConsultationRequestDto: RegisterlegalConsultationRequestDto,
  ): Promise<Result<AppNotification, RegisterlegalConsultationRequestDto>> {
    const notification: AppNotification = await this.registerlegalConsultationValidator.validate(
        registerlegalConsultationRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerlegalConsultationCommand: RegisterlegalConsultationCommand = new RegisterlegalConsultationCommand(
      registerlegalConsultationRequestDto.document,
      registerlegalConsultationRequestDto.lawyerid,
      registerlegalConsultationRequestDto.customerid,
      registerlegalConsultationRequestDto.coment,
      registerlegalConsultationRequestDto.cost,
    );
    const legalConsultationId = await this.commandBus.execute(registerlegalConsultationCommand);
    const registerlegalConsultationResponseDto: RegisterlegalConsultationResponseDto = new RegisterlegalConsultationResponseDto(
      legalConsultationId,
      registerlegalConsultationRequestDto.document,
      registerlegalConsultationRequestDto.lawyerid,
      registerlegalConsultationRequestDto.customerid,
      registerlegalConsultationRequestDto.coment,
      registerlegalConsultationRequestDto.cost,
    );
    return Result.ok(registerlegalConsultationResponseDto);
  }
}
