import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {LegalConsultation} from "../../../domain/entities/legal-consultation.entity";
import {LegalConsultationFactory} from "../../../domain/factories/consultation.factory";
import {RegisterLegalConsultationCommand} from "../../commands/register-legal-consultation.command";
import {LegalConsultationTypeORM} from "../../../infrastructure/persistence/typeorm/entities/legal-consultation.typeorm";
import {Result} from "typescript-result";
import {AppNotification} from "../../../../../common/application/app.notification";
import {LawDocument} from "../../../domain/value-objects/law-document.value";
import {LawComment} from "../../../domain/value-objects/law-comment.value";
import {LegalConsultationId} from "../../../domain/value-objects/legal-consultation-id.value";
import {LegalConsultationMapper} from "../../mappers/legal-consultation.mapper";
import {Cost} from "../../../domain/value-objects/cost.value";

@CommandHandler(RegisterLegalConsultationCommand)
export class RegisterLegalConsultationHandler
    implements ICommandHandler<RegisterLegalConsultationCommand> {
  constructor(
      @InjectRepository(LegalConsultationTypeORM)
      private legalConsultationRepository: Repository<LegalConsultationTypeORM>,
      private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterLegalConsultationCommand) {
    const lawDocumentResult: Result<AppNotification, LawDocument> = LawDocument.create(command.lawDocument);
    if (lawDocumentResult.isFailure()) {
      return 0;
    }
    const lawCommentResult: Result<AppNotification, LawComment> = LawComment.create(command.lawComment);
    if (lawCommentResult.isFailure()) {
      return 0;
    }
    const costResult: Result<AppNotification, Cost> = Cost.create(command.cost);
    if (costResult.isFailure()) {
      return 0;
    }
    let legalConsultation: LegalConsultation = LegalConsultationFactory.createFrom(
        lawDocumentResult.value,
        lawCommentResult.value,
        costResult.value
    );
    let legalConsultationTypeORM= LegalConsultationMapper.toTypeORM(legalConsultation);
    legalConsultationTypeORM = await this.legalConsultationRepository.save(legalConsultationTypeORM);
    if (legalConsultationTypeORM == null) {
      return 0;
    }
    const legalConsultationId = Number(legalConsultationTypeORM.id);
    legalConsultation.changeId(LegalConsultationId.create(legalConsultationId));
    legalConsultation = this.publisher.mergeObjectContext(legalConsultation);
    legalConsultation.register();
    legalConsultation.commit();
    return legalConsultationId;
  }
}