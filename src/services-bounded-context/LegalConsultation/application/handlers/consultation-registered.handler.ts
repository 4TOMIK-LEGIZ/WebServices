import { RegisterlegalConsultationCommand } from "../../messaging/register-consultation.command";
import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {legalConsultationSchema} from "../../infrastructure/persistence/schemas/consultation.schema";
import {InsertResult, Repository} from "typeorm";
import {LegalConsultation} from "../../domain/entities/legalConsultation.entity";
import {LegalConsultationFactory} from "../../domain/factories/consultation.factory";


@CommandHandler(RegisterlegalConsultationCommand)
export class RegisterlegalConsultationHandler
  implements ICommandHandler<RegisterlegalConsultationCommand> {
  constructor(
    @InjectRepository(legalConsultationSchema)
    private legalConsultationRepository: Repository<LegalConsultation>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterlegalConsultationCommand) {
    const legalConsultationEntity = LegalConsultationFactory.createFrom(command.document, command.lawyerid, command.customerid, command.coment, command.cost);
    const insertResult:InsertResult = await this.legalConsultationRepository.insert(legalConsultationEntity);
    const legalConsultationId:number = Number(insertResult.identifiers[0].id);
    legalConsultationEntity.changeId(legalConsultationId);
    const legalConsultation = this.publisher.mergeObjectContext(legalConsultationEntity);
    legalConsultation.register();
    legalConsultation.commit();
    return legalConsultationId;
  }
}
