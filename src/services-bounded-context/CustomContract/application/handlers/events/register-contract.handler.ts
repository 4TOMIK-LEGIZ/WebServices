import { legalConsultationRegisteredEvent } from "../../messaging/consultation-registered.event";
import {EventsHandler, IEventHandler} from "@nestjs/cqrs";

@EventsHandler(CusustomContractRegisteredEvent)
export class CustomContractRegisteredHandler implements IEventHandler<legalConsultationRegisteredEvent> {
  constructor() {}

  handle(event: CustomContractRegisteredEvent) {
    console.log('handle logic for legalConsultationRegisteredEvent');
    console.log(event);
  }
}
