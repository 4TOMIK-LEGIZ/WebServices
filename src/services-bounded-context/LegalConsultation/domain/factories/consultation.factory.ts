
import { LegalConsultation } from "../entities/legal-consultation.entity";
import {LawDocument} from "../value-objects/law-document.value";
import {LawComment} from "../value-objects/law-comment.value";
import {LegalConsultationId} from "../value-objects/legal-consultation-id.value";
import {Cost} from "../value-objects/cost.value";

export class LegalConsultationFactory {
    public static createFrom(lawDocument: LawDocument, lawComment: LawComment, cost: Cost): LegalConsultation {
      return new LegalConsultation(LegalConsultationId.create(0), lawDocument, lawComment, cost);
    }
}