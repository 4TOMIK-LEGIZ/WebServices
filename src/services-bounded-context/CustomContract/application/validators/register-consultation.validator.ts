import { AppNotification } from "src/common/application/app.notification";
import { Money } from "src/common/domain/value-objects/money.value";
import { LegalConsultation } from "../../domain/entities/customContract.entity";
import { legalConsultationSchema } from "../../infrastructure/persistence/schemas/consultation.schema";
import { RegisterlegalConsultationRequestDto } from "../dtos/register-consultation-request.dto";


@Injectable()
export class RegisterlegalConsultationValidator {
  constructor(
    @InjectRepository(legalConsultationSchema)
    private legalConsultationRepository: Repository<LegalConsultation>,
  ) { }

  public async validate(
    registerlegalConsultationRequestDto: RegisterlegalConsultationRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const document: Document = registerlegalConsultationRequestDto.document.trim();
    if (document.length <= 0) {
      notification.addError('legalConsultation document is required', null);
    }
    const lawyerid: number = registerlegalConsultationRequestDto.lawyerid.trim();
    if (lawyerid.length <= 0) {
      notification.addError('legalConsultation lawyerid is required', null);
    }
    const customerid: number = registerlegalConsultationRequestDto.customerid.trim();
    if (customerid.length <= 0) {
      notification.addError('legalConsultation customerid is required', null);
    }
    const coment: string = registerlegalConsultationRequestDto.coment.trim();
    if (coment.length <= 0) {
      notification.addError('legalConsultation coment is required', null);
    }
    const cost: Money = registerlegalConsultationRequestDto.cost.trim();
    if (cost.length <= 0) {
      notification.addError('legalConsultation cost is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}