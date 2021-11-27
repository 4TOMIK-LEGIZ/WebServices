import { Column, Entity } from "typeorm";
import {ScoreTypeORM} from "../value-object/score.typeorm";
import {TextDescriptionTypeORM} from "../value-object/text-description.typeorm";
import {QualificationIdTypeORM} from "../value-object/qualification.id.typeorm";

@Entity('qualifications')
export class QualificationTypeORM {
    @Column((type) => QualificationIdTypeORM, { prefix: false })
    public id: QualificationIdTypeORM;

    @Column((type) => ScoreTypeORM, { prefix: false})
    public score: ScoreTypeORM;

    @Column((type) => TextDescriptionTypeORM, { prefix: false})
    public textDescription: TextDescriptionTypeORM;
}