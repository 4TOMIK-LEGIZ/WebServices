import {IEventHandler} from "@nestjs/cqrs";
import {EventsHandler} from "@nestjs/cqrs/dist/utils/events-handler.decorator";
import { SubscriptionRegisteredEvent } from "../../../domain/events/subscription-registered.event";

@EventsHandler(SubscriptionRegisteredEvent)
export class SubscriptionRegisteredHandler implements IEventHandler<SubscriptionRegisteredEvent> {
    constructor() {}

    handle(event: SubscriptionRegisteredEvent) {
        console.log(event);
    }
}