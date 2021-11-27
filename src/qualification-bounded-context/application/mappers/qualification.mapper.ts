import { Qualification } from "src/qualification-bounded-context/domain/entities/qualification.entity";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/persistence/typeorm/entities/qualification.typeorm";
import {TextDescriptionTypeORM} from "../../infrastructure/persistence/typeorm/value-object/text-description.typeorm";
import {ScoreTypeORM} from "../../infrastructure/persistence/typeorm/value-object/score.typeorm";
import {QualificationIdTypeORM} from "../../infrastructure/persistence/typeorm/value-object/qualification.id.typeorm";

export class QualificationMapper {
    public static toTypeORM(qualification: Qualification): QualificationTypeORM {
        const qualificationTypeORM: QualificationTypeORM = new QualificationTypeORM();
        qualificationTypeORM.id = QualificationIdTypeORM.from(qualification.getId().getValue());
        qualificationTypeORM.score = ScoreTypeORM.from(qualification.getScore().getValue());
        qualificationTypeORM.textDescription = TextDescriptionTypeORM.from(qualification.getScore().getValue());
        return qualificationTypeORM;
    }
}