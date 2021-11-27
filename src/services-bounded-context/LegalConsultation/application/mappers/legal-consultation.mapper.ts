import {LegalConsultation} from "../../domain/entities/legal-consultation.entity";
import {LegalConsultationTypeORM} from "../../infrastructure/persistence/typeorm/entities/legal-consultation.typeorm";
import {LegalConsultationIdTypeORM} from "../../infrastructure/persistence/typeorm/entities/legal-consultation.id.typeorm";
import {LawDocumentTypeORM} from "../../infrastructure/persistence/typeorm/entities/law-document.typeorm";
import {LawCommentTypeORM} from "../../infrastructure/persistence/typeorm/entities/law-comment.typeorm";
import {CostTypeORM} from "../../../CustomContract/infrastructure/persistence/typeorm/entities/cost.typeorm";

export class LegalConsultationMapper {
    public static toTypeORM(legalConsultation: LegalConsultation): LegalConsultationTypeORM {
        const legalConsultationTypeORM: LegalConsultationTypeORM = new LegalConsultationTypeORM();
        legalConsultationTypeORM.id = LegalConsultationIdTypeORM.from(legalConsultation.getId().getValue());
        legalConsultationTypeORM.lawDocument = LawDocumentTypeORM.from(legalConsultation.getLawDocument().getValue());
        legalConsultationTypeORM.lawComment = LawCommentTypeORM.from(legalConsultation.getLawComment().getValue());
        legalConsultationTypeORM.cost = CostTypeORM.from(legalConsultation.getCost().getValue());
        return legalConsultationTypeORM;
    }
}