import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { QualificationQualified } from "src/qualification-bounded-context/domain/events/qualification.qualified.event";

@EventsHandler(QualificationQualified)
export class QualificationQualifiedHandler implements IEventHandler<QualificationQualified> {
    constructor() {}

    async handle(event: QualificationQualified){
        console.log('Qualification BC - handle QualificationQualified');
    }
}