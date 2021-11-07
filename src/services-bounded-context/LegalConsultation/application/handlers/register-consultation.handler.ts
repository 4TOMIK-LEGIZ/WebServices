import { legalConsultationRegisteredEvent } from "../../messaging/consultation-registered.event";

@EventsHandler(legalConsultationRegisteredEvent)
export class legalConsultationRegisteredHandler implements IEventHandler<legalConsultationRegisteredEvent> {
  constructor() {}

  handle(event: legalConsultationRegisteredEvent) {
    console.log('handle logic for legalConsultationRegisteredEvent');
    console.log(event);
  }
}
