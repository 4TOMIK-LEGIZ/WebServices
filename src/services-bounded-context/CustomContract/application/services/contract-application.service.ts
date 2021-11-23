import { AppNotification } from "src/common/application/app.notification";
import {
  RegisterCustomContractRequestDto,
} from "../dtos/request/register-contract-request.dto";
import {
  RegisterCustomContractResponseDto,
} from "../dtos/response/register-contract-response.dto";
import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";
import {RegisterCustomContractCommand} from "../../messaging/register-contract.command";
import {RegisterCustomContractValidator} from "../validators/register-contract.validator";


@Injectable()
export class CustomContractApplicationService {
  constructor(
      private commandBus: CommandBus,
      private registercustomContractValidator: RegisterCustomContractValidator,
  ) {}

  async register(
      registercustomContractRequestDto: RegisterCustomContractRequestDto,
  ): Promise<Result<AppNotification, RegisterCustomContractRequestDto>> {
    const notification: AppNotification = await this.registercustomContractValidator.validate(
        registercustomContractRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registercustomContractCommand: RegisterCustomContractCommand = new RegisterCustomContractCommand(
        registercustomContractRequestDto.description,
        registercustomContractRequestDto.lawyerid,
        registercustomContractRequestDto.customerid,
        registercustomContractRequestDto.start_date,
        registercustomContractRequestDto.end_date,
        registercustomContractRequestDto.cost,
    );
    const customContractId = await this.commandBus.execute(registercustomContractCommand);
    const registercustomContractResponseDto: RegisterCustomContractResponseDto = new RegisterCustomContractResponseDto(
        customContractId,
        registercustomContractRequestDto.description,
        registercustomContractRequestDto.lawyerid,
        registercustomContractRequestDto.customerid,
        registercustomContractRequestDto.start_date,
        registercustomContractRequestDto.end_date,
        registercustomContractRequestDto.cost,
    );
    return Result.ok(registercustomContractResponseDto);
  }
}


