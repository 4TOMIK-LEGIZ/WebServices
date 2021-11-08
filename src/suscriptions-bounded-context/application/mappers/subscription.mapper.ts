import {Subscription} from "../../domain/entities/subscription.entity";
import {SubscriptionTypeORM} from "../../infrastructure/persistence/typeorm/entities/subscription.typeorm";
import {SubscriptionIdTypeORM} from "../../infrastructure/persistence/typeorm/entities/subscription.id.typeorm";
import {PriceTypeORM} from "../../infrastructure/persistence/typeorm/entities/price.typeorm";
import {DescriptionTypeORM} from "../../infrastructure/persistence/typeorm/entities/description.typeorm";

export class SubscriptionMapper {
    public static toTypeORM(subscription: Subscription): SubscriptionTypeORM {
        const subscriptionTypeORM: SubscriptionTypeORM = new SubscriptionTypeORM();
        subscriptionTypeORM.id = SubscriptionIdTypeORM.from(subscription.getId().getValue());
        subscriptionTypeORM.price = PriceTypeORM.from(subscription.getPrice().getValue());
        subscriptionTypeORM.description = DescriptionTypeORM.from(subscription.getDescription().getValue());
        return subscriptionTypeORM;
    }

}