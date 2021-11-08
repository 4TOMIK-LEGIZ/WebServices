import { EventsHandler } from "@nestjs/cqrs";

@EventsHandler(CustomerSerchLawyerEvent)
export class SerchLawyerHandler implements IEventHandler<SerchLawyerEvent> {
  constructor() {}

  handle(event: SerchLawyerEvent) {
    console.log('handle logic for SerchLawyerEvent');
    console.log(event);
  }
}