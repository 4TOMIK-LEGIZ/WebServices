import {Column, Entity, Unique} from "typeorm";
import {type} from "os";
import {LegalConsultationIdTypeORM} from "./legalConsultation.id.typeorm";
import {DocumentTypeORM} from "./document.typeorm";
import {LawyerIdTypeORM} from "./lawyer.id.typeorm";
import {CustomerIdTypeORM} from "./customer.id.typeorm";
import {ComentTypeORM} from "./coment.typeorm";
import {CostTypeORM} from "./cost.typeorm";

@Entity('legalConsultation')
@Unique('UQ_legalConsultation_coment',['coment.value'])
export class LegalConsultationTypeORM {
    @Column((type)=> LegalConsultationTypeORM,{prefix:false})
    public id: LegalConsultationIdTypeORM;

    @Column((type)=> DocumentTypeORM,{prefix: false})
    public document: DocumentTypeORM;

    @Column((type)=> LawyerIdTypeORM,{prefix: false})
    public lawyerid: LawyerIdTypeORM;

    @Column((type)=> CustomerIdTypeORM,{prefix: false})
    public customerid: CustomerIdTypeORM;

    @Column((type)=> ComentTypeORM,{prefix: false})
    public coment: DocumentTypeORM;

    @Column((type)=> CostTypeORM,{prefix: false})
    public cost: DocumentTypeORM;


}
