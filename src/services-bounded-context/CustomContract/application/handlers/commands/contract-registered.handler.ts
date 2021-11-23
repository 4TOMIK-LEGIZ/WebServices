import { RegisterlegalConsultationCommand } from "../../messaging/register-consultation.command";
import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {CustomContract} from "../../../domain/entities/customContract.entity";
import {CustomContractFactory} from "../../../domain/factories/customContract.factory";


@CommandHandler(RegisterCustomContractCommand)
export class RegistercustomContractnHandler
  implements ICommandHandler<RegisterlegalConsultationCommand> {
  constructor(
      @InjectRepository(customContractSchema)
      private customContractRepository: Repository<CustomContract>,
      private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterCustomContractCommand) {
    const customContractEntity = CustomContractFactory.createFrom(command.description, command.lawyerid, command.customerid, command.start_date, command.end_date, command.cost);
    const insertResult:InsertResult = await this.customContractRepository.insert(customContractEntity);
    const customContractId:number = Number(insertResult.identifiers[0].id);
    customContractEntity.changeId(customContractId);
    const customContract = this.publisher.mergeObjectContext(customContractEntity);
    customContract.register();
    customContract.commit();
    return customContractId;
  }
}


