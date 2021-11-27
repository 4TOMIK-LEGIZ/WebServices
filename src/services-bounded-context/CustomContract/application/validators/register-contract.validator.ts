import { AppNotification } from "src/common/application/app.notification";
import {RegisterCustomContractRequestDto} from "../dtos/request/register-contract-request.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CustomContractTypeORM} from "../../infrastructure/persistence/typeorm/entities/custom-contract.typeorm";


@Injectable()
export class RegisterCustomContractValidator {
  constructor(
      @InjectRepository(CustomContractTypeORM)
      private customContractRepository: Repository<CustomContractTypeORM>,
  ) { }

  public async validate(
      registerCustomContractRequestDto: RegisterCustomContractRequestDto,
  ): Promise<AppNotification> {
    const notification: AppNotification = new AppNotification();
    const lawDescription: string = registerCustomContractRequestDto.lawDescription.trim();
    if (lawDescription.length <= 0) {
      notification.addError('CustomContract lawDescription is required', null);
    }
    const startedAt: string = registerCustomContractRequestDto.startedAt.trim();
    if (startedAt.length <= 0) {
      notification.addError('customContract startedAt is required', null);
    }
    const finishedAt: string = registerCustomContractRequestDto.finishedAt.trim();
    if (finishedAt.length <= 0) {
      notification.addError('customContract finished is required', null);
    }
    const cost: string = registerCustomContractRequestDto.cost.trim();
    if (cost.length <= 0) {
      notification.addError('customContract cost is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}

