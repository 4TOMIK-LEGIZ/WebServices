import {Column, Entity} from "typeorm";
import {LegalConsultationIdTypeORM} from "./legal-consultation.id.typeorm";
import {LawDocumentTypeORM} from "./law-document.typeorm";
import {LawCommentTypeORM} from "./law-comment.typeorm";
import {CostTypeORM} from "./cost.typeorm";


@Entity('legalConsultations')
export class LegalConsultationTypeORM {
    @Column((type)=> LegalConsultationIdTypeORM,{prefix:false})
    public id: LegalConsultationIdTypeORM;

    @Column((type)=> LawDocumentTypeORM,{prefix: false})
    public lawDocument: LawDocumentTypeORM;

    @Column((type)=> LawCommentTypeORM,{prefix: false})
    public lawComment: LawCommentTypeORM;

    @Column((type)=> CostTypeORM,{prefix: false})
    public cost: CostTypeORM;


}
