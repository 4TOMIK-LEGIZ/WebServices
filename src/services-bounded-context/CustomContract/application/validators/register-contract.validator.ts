import { AppNotification } from "src/common/application/app.notification";
import { Money } from "src/common/domain/value-objects/money.value";
import {CustomContract} from "../../domain/entities/customContract.entity";
import {customContractSchema} from "../../infrastructure/persistence/schemas/contract.schema";
import {
  RegisterCustomContractRequestDto,
} from "../dtos/request/register-contract-request.dto";
import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";


@Injectable()
export class RegisterCustomContractValidator {
  constructor(
      @InjectRepository(customContractSchema)
      private customContractRepository: Repository<CustomContract>,
  ) { }

  public async validate(
      registercustomContractRequestDto: RegisterCustomContractRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const description: string = registercustomContractRequestDto.description.trim();
    if (description.length <= 0) {
      notification.addError('customContract description is required', null);
    }

    const start_date: string = registercustomContractRequestDto.start_date.trim();
    if (start_date.length <= 0) {
      notification.addError('customContract coment is required', null);
    }
    const end_date: string = registercustomContractRequestDto.end_date.trim();
    if (end_date.length <= 0) {
      notification.addError('customContract coment is required', null);
    }

    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}

