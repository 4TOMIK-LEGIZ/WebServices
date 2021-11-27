import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {CustomContractRegisteredEvent} from "../../../domain/events/custom-contract-registered.event";

@EventsHandler(CustomContractRegisteredEvent)
export class CustomContractRegisteredHandler implements IEventHandler<CustomContractRegisteredEvent> {
  constructor() {}

  handle(event: CustomContractRegisteredEvent) {
    console.log('handle logic for legalConsultationRegisteredEvent');
    console.log(event);
  }
}
