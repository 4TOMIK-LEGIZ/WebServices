import {AggregateRoot} from "@nestjs/cqrs";
import {SubscriptionId} from "../value-objects/subscription-id.value";
import {Price} from "../value-objects/price.value";
import {Description} from "../value-objects/description.value";
import {SubscriptionRegisteredEvent} from "../events/subscription-registered.event";

export class Subscription extends AggregateRoot {
    private id: SubscriptionId;
    private price: Price;
    private description: Description;

    public constructor(id: SubscriptionId, price: Price, description: Description) {
        super();
        this.id = id;
        this.price = price;
        this.description = description;
    }

    public register() {
        const event = new SubscriptionRegisteredEvent(
            this.id.getValue(),
            this.price.getValue(),
            this.description.getValue(),
        );
        this.apply(event);
    }

    public getId(): SubscriptionId {
        return this.id;
    }

    public getPrice(): Price {
        return this.price;
    }

    public getDescription(): Description {
        return this.description;
    }

    public changeId(id: SubscriptionId) {
        this.id = id;
    }
}