import {IEventHandler} from "@nestjs/cqrs";
import {EventsHandler} from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import {LegalConsultationRegisteredEvent} from "../../../domain/event/legal-consultation-registered.event";


@EventsHandler(LegalConsultationRegisteredEvent)
export class LegalConsultationRegisteredHandler implements IEventHandler<LegalConsultationRegisteredEvent> {
  constructor() {}

  handle(event: LegalConsultationRegisteredEvent) {
    console.log('handle logic for legalConsultationRegisteredEvent');
    console.log(event);
  }
}
