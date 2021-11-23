import { AggregateRoot } from "@nestjs/cqrs";
import { QualificationStatus } from "../enums/qualification.status";
import { QualificationId } from "../value-objects/qualification-id.value";

export class Qualification extends AggregateRoot {
    private id: QualificationId;
    private readonly status: QualificationStatus;

    public constructor(status: QualificationStatus) {
        super();
        this.status = status;
    }

    public getStatus(): QualificationStatus {
        return this.status;
    }
}

