import { EventsHandler } from "@nestjs/cqrs";

@EventsHandler(CustomerRegisterEvent)
export class ServiceQualificationRegisteredHandler implements
IEventHandler<ServiceQualificationRegisteredEvent> {
    constructor() {}

    handle(event: ServiceQualificationRegisteredEvent) {
        console.log('handle logic for ServiceQualificationRegisteredEvent');
        console.log(event);
    }
}