import { Qualification } from "../entities/qualification.entity";
import {TextDescription} from "../value-objects/text-description.value";
import {Score} from "../value-objects/score.value";
import {QualificationId} from "../value-objects/qualification-id.value";

export class QualificationFactory {
    public static createFrom(score: Score, textDescription: TextDescription): Qualification {
        return new Qualification(QualificationId.create(0), score, textDescription);
    }
}