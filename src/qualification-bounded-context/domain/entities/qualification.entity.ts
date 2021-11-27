import { AggregateRoot } from "@nestjs/cqrs";
import { QualificationId } from "../value-objects/qualification-id.value";
import {Score} from "../value-objects/score.value";
import {TextDescription} from "../value-objects/text-description.value";
import {QualificationRegisteredEvent} from "../events/qualification.qualified.event";

export class Qualification extends AggregateRoot {
    private id: QualificationId;
    private score: Score;
    private textDescription: TextDescription;

    public constructor(id: QualificationId, score: Score, textDescription: TextDescription) {
        super();
        this.id = id;
        this.score = score;
        this.textDescription = textDescription;
    }

    public register() {
        const event = new QualificationRegisteredEvent(
            this.id.getValue(),
            this.score.getValue(),
            this.textDescription.getValue()
        );
        this.apply(event);
    }

    public getId(): QualificationId {
        return this.id;
    }

    public getScore(): Score {
        return this.score;
    }

    public getTextDescription(): TextDescription {
        return this.textDescription
    }

    public changeId(id: QualificationId): void {
        this.id = id;
    }
}

