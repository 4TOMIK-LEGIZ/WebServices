import { AppNotification } from "src/common/application/app.notification";
import {RegisterCustomContractRequestDto,} from "../dtos/request/register-contract-request.dto";
import {RegisterCustomContractResponseDto,} from "../dtos/response/register-contract-response.dto";
import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";
import {RegisterCustomContractValidator} from "../validators/register-contract.validator";
import {RegisterCustomContractCommand} from "../commands/register-custom-contract.command";


@Injectable()
export class CustomContractsApplicationService {
  constructor(
      private commandBus: CommandBus,
      private registerCustomContractValidator: RegisterCustomContractValidator,
  ) {}

  async register(
      registerCustomContractRequestDto: RegisterCustomContractRequestDto,
  ): Promise<Result<AppNotification, RegisterCustomContractResponseDto>> {
    const notification: AppNotification =
        await this.registerCustomContractValidator.validate(
        registerCustomContractRequestDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const registerCustomContractCommand: RegisterCustomContractCommand =
        new RegisterCustomContractCommand(
        registerCustomContractRequestDto.lawDescription,
        registerCustomContractRequestDto.startedAt,
        registerCustomContractRequestDto.finishedAt,
        registerCustomContractRequestDto.cost,
    );
    const customContractId = await this.commandBus.execute(registerCustomContractCommand);
    const registerCustomContractResponseDto: RegisterCustomContractResponseDto =
        new RegisterCustomContractResponseDto(
        customContractId,
        registerCustomContractRequestDto.lawDescription,
        registerCustomContractRequestDto.startedAt,
        registerCustomContractRequestDto.finishedAt,
        registerCustomContractRequestDto.cost,
    );
    return Result.ok(registerCustomContractResponseDto);
  }
}


