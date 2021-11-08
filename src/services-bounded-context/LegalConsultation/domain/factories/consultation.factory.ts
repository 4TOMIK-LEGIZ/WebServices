import { Money } from "src/common/domain/value-objects/money.value";
import { LegalConsultation } from "../entities/consultation.entity";

export class LegalConsultationFactory {
    public static createFrom(document: Document, lawyerid: number, customerid: number,coment: string, cost: Money): LegalConsultation {
      return new LegalConsultation(0, document, lawyerid, customerid, coment, cost);
    }
  
    public static withId(id: number, document: Document, lawyerid: number, customerid: number, coment: string, cost: Money): LegalConsultation {
      return new LegalConsultation(id, document, lawyerid, customerid, coment, cost);
    }
  }