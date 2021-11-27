import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import {QualificationRegisteredEvent } from "src/qualification-bounded-context/domain/events/qualification.qualified.event";

@EventsHandler(QualificationRegisteredEvent)
export class QualificationRegisteredHandler implements IEventHandler<QualificationRegisteredEvent> {
    constructor() {}

    handle(event: QualificationRegisteredEvent){
        console.log('Qualification BC - handle QualificationQualified');
    }
}