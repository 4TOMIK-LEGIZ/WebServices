import { IEventHandler } from "@nestjs/cqrs";
import {LawyerRegistered} from "../../../domain/events/lawyer-registered.event";
import { EventsHandler } from "@nestjs/cqrs/dist/utils/events-handler.decorator";

@EventsHandler(LawyerRegistered)
export class LawyerRegisteredHandler implements IEventHandler<LawyerRegistered> {
    constructor() {}

    handle(event: LawyerRegistered) {
        console.log(event);
    }
}