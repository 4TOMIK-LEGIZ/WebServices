import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { SerchLawyerSchema } from "../../infrastructure.layer";

@CommandHandler(SerchLawyerCommand)
export class SerchLawyerHandler
  implements ICommandHandler<SerchLawyerCommand> {
  constructor(
    @InjectRepository(SerchLawyerSchema)
    private SerchLawyerRepository: Repository<SerchLawyer>,
    private publisher: EventPublisher,
  ) {}

  async execute(command: SerchLawyerCommand) {
    const SerchLawyerEntity: SerchLawyerFactory = SerchLawyerFactory.createFrom(command.SpecializationID, command.Rating, command.Zone);
    const insertResult:InsertResult = await this.SerchLawyerRepository.insert(SerchLawyerEntity);
    const SerchLawyerId:number = Number(insertResult.identifiers[0].id);
    SerchLawyerEntity.changeId(SerchLawyerId);
    const SerchLawyer = this.publisher.mergeObjectContext(SerchLawyerEntity);
    SerchLawyer.register();
    SerchLawyer.commit();
    return SerchLawyerId;
  }
}