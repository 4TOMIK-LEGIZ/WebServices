import { AppNotification } from "src/common/application/app.notification";

import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {LegalConsultationTypeORM} from "../../infrastructure/persistence/typeorm/entities/legal-consultation.typeorm";
import {Repository} from "typeorm";
import {RegisterLegalConsultationRequestDto} from "../dtos/register-consultation-request.dto";


@Injectable()
export class RegisterLegalConsultationValidator {
  constructor(
    @InjectRepository(LegalConsultationTypeORM)
    private legalConsultationRepository: Repository<LegalConsultationTypeORM>,
  ) { }

  public async validate(
    registerLegalConsultationRequestDto: RegisterLegalConsultationRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const lawDocument: string = registerLegalConsultationRequestDto.lawDocument.trim();
    if (lawDocument.length <= 0) {
      notification.addError('legalConsultation document is required', null);
    }
    const lawComment: string = registerLegalConsultationRequestDto.lawComment.trim();
    if (lawComment.length <= 0) {
      notification.addError('legalConsultation lawComment is required', null);
    }
    const cost: string = registerLegalConsultationRequestDto.cost.trim();
    if (cost.length <= 0) {
      notification.addError('legalConsultation cost is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}