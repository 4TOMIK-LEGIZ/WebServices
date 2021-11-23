import { Price} from "../value-objects/price.value";
import { Description } from "../value-objects/description.value";
import { Subscription } from "../entities/subscription.entity";
import { SubscriptionId } from "../value-objects/subscription-id.value";

export class SubscriptionFactory {
    public static createFrom(price: Price, description: Description): Subscription {
        return new Subscription(SubscriptionId.create(0), price, description);
    }
}