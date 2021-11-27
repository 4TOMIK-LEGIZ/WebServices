import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {RegisterCustomContractCommand} from "../../commands/register-custom-contract.command";
import {Result} from "typescript-result";
import {AppNotification} from "../../../../../common/application/app.notification";
import {LawDescription} from "../../../domain/value-objects/law-description.value";
import {StartedAt} from "../../../domain/value-objects/started-at.value";
import {FinishedAt} from "../../../domain/value-objects/finished-at.value";
import {Cost} from "../../../domain/value-objects/cost.value";
import {CustomContract} from "../../../domain/entities/customContract.entity";
import {CustomContractFactory} from "../../../domain/factories/customContract.factory";
import {CustomContractTypeORM} from "../../../infrastructure/persistence/typeorm/entities/custom-contract.typeorm";
import {CustomContractId} from "../../../domain/value-objects/custom-contract-id.value";
import {CustomContractMapper} from "../../mappers/custom-contract.mapper";



@CommandHandler(RegisterCustomContractCommand)
export class RegisterCustomContractHandler
    implements ICommandHandler<RegisterCustomContractCommand>
{
  constructor(
      @InjectRepository(CustomContractTypeORM)
      private customContractRepository: Repository<CustomContractTypeORM>,
      private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterCustomContractCommand) {
    const lawDescriptionResult: Result<AppNotification, LawDescription> = LawDescription.create(command.lawDescription);
    if (lawDescriptionResult.isFailure()) {
      return 0;
    }
    const startedAtResult: Result<AppNotification, StartedAt> = StartedAt.create(command.startedAt);
    if (startedAtResult.isFailure()) {
      return 0;
    }
    const finishedAtResult: Result<AppNotification, FinishedAt> = FinishedAt.create(command.finishedAt);
    if (finishedAtResult.isFailure()) {
      return 0;
    }
    const costResult: Result<AppNotification, Cost> = Cost.create(command.cost);
    if (costResult.isFailure()) {
      return 0;
    }
    let customContract: CustomContract = CustomContractFactory.createFrom(
        lawDescriptionResult.value,
        startedAtResult.value,
        finishedAtResult.value,
        costResult.value
    );
    let customContractTypeORM = CustomContractMapper.toTypeORM(customContract);
    customContractTypeORM = await this.customContractRepository.save(customContractTypeORM);
    if (customContractTypeORM == null) {
      return 0;
    }
    const customContractId = Number(customContractTypeORM.id.value);
    customContract.changeId(CustomContractId.create(customContractId));
    customContract = this.publisher.mergeObjectContext(customContract);
    customContract.register();
    customContract.commit();
    return customContractId;
  }
}


