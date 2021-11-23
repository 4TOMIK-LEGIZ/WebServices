import {EventsHandler, IEventHandler} from "@nestjs/cqrs";
import {CustomerRegistered} from "../../../domain/events/customer-registered.event";

@EventsHandler(CustomerRegistered)
export class CustomerRegisteredHandler implements IEventHandler<CustomerRegistered> {
    constructor() {}

    handle(event: CustomerRegistered) {
        console.log('handle logic for CustomerRegistered');
        console.log(event);
    }
}