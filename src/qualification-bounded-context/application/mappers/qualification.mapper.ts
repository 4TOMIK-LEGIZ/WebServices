import { Qualification } from "src/qualification-bounded-context/domain/entities/qualification.entity";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/entities/qualification.typeorm";

export class QualificationMapper {
    public static toTypeORM(qualification: Qualification): QualificationTypeORM {
        const qualificationTypeORM: QualificationTypeORM = new QualificationTypeORM();
        qualificationTypeORM.status = qualification.getStatus();
        return qualificationTypeORM;
    }
}