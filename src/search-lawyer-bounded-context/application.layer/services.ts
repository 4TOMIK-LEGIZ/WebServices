import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Result } from "typescript-result";
import { customSerchLawyerService, SerchCustomerFilters } from "./dtos";
import { SerchLawyerValidator} from "./validators";

@Injectable()
export class SerchLawyerApplicationService {
  constructor(
    private commandBus: CommandBus,
    private SerchLawyer: SerchLawyer,
  ) {}

  async register(
    SerchLawyerDto: SerchLawyerDto,
  ): Promise<Result<AppNotification, RSerchLawyerDto>> {
    const notification: AppNotification = await this.SerchLawyerValidator.validate(
      SerchLawyerDto,
    );
    if (notification.hasErrors()) {
      return Result.error(notification);
    }
    const SerchLawyerCommand: SerchLawyerCommand = new SerchLawyerCommand(
      SerchLawyerDto.EspecializationID,
      SerchLawyerDto.Rating,
      SerchLawyerDto.Zone,
    );
    const Id = await this.commandBus.execute(SerchLawyerCommand);
    const rSerchLawyerResponseDto: SerchLawyerResponseDto = new SerchLawyerResponseDto(
      Id,
      rSerchLawyerDto.EspecializationID,
      SerchLawyerDto.Rating,
      SerchLawyerDto.Zone,
    );
    return Result.ok(SerchLawyerResponseDto);
  }
}