import { RegisterlegalConsultationCommand } from "../../messaging/register-consultation.command";


@CommandHandler(RegisterlegalConsultationCommand)
export class RegisterlegalConsultationHandler
  implements ICommandHandler<RegisterlegalConsultationCommand> {
  constructor(
    @InjectRepository(legalConsultationSchema)
    private legalConsultationRepository: Repository<legalConsultation>,
    private publisher: EventPublisher,
  ) {}
  async execute(command: RegisterlegalConsultationCommand) {
    const legalConsultationEntity = legalConsultationFactory.createFrom(command.document, command.lawyerid, command.customerid, command.coment, command.cost);
    const insertResult:InsertResult = await this.legalConsultationRepository.insert(legalConsultationEntity);
    const legalConsultationId:number = Number(insertResult.identifiers[0].id);
    legalConsultationEntity.changeId(legalConsultationId);
    const legalConsultation = this.publisher.mergeObjectContext(legalConsultationEntity);
    legalConsultation.register();
    legalConsultation.commit();
    return legalConsultationId;
  }
}