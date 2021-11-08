import {Column, Entity, Unique} from "typeorm";
import {SubscriptionIdTypeORM} from "./subscription.id.typeorm";
import {DescriptionTypeORM} from "./description.typeorm";
import {PriceTypeORM} from "./price.typeorm";

@Entity('subscriptions')
@Unique('UQ_subscription_description', ['description.value'])
export class SubscriptionTypeORM {
    @Column((type) => SubscriptionIdTypeORM, { prefix: false })
    public id: SubscriptionIdTypeORM;

    @Column((type) => PriceTypeORM, { prefix:false })
    public price: PriceTypeORM;

    @Column((type) => DescriptionTypeORM, { prefix:false })
    public description: DescriptionTypeORM;
}