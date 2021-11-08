import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {RegisterSubscriptionCommand} from "../../commands/register-subscription.command";
import {InjectRepository} from "@nestjs/typeorm";
import {SubscriptionTypeORM} from "../../../infrastructure/persistence/typeorm/entities/subscription.typeorm";
import {Repository} from "typeorm";
import {Result} from "typescript-result";
import {AppNotification} from "../../../shared/application/app.notification";
import {Subscription} from "../../../domain/entities/subscription.entity";
import {SubscriptionFactory} from "../../../domain/factories/subscription.factory";
import {Price} from "../../../domain/value-objects/price.value";
import {Description} from "../../../domain/value-objects/description.value";
import {SubscriptionId} from "../../../domain/value-objects/subscription-id.value";
import {SubscriptionMapper} from "../../mappers/subscription.mapper";

@CommandHandler(RegisterSubscriptionCommand)
export class RegisterSubscriptionHandler implements ICommandHandler<RegisterSubscriptionCommand> {
    constructor(
        @InjectRepository(SubscriptionTypeORM)
        private subscriptionRepository: Repository<SubscriptionTypeORM>,
        private publisher: EventPublisher,
    ) {}
    
    async execute(command: RegisterSubscriptionCommand) {
        const priceResult: Result<AppNotification, Price> = Price.create(command.price);
        if (priceResult.isFailure()) {
            return 0;
        }
        const descriptionResult: Result<AppNotification, Description> = Description.create(command.description);
        if (descriptionResult.isFailure()) {
            return 0;
        }
        let subscription: Subscription = SubscriptionFactory.createFrom(
            priceResult.value,
            descriptionResult.value,
        )
        let subscriptionTypeORM = SubscriptionMapper.toTypeORM(subscription);
        subscriptionTypeORM = await this.subscriptionRepository.save(subscriptionTypeORM);
        if (subscriptionTypeORM == null ) {
            return 0;
        }
        const subscriptionId = Number(subscriptionTypeORM.id.value);
        subscription.changeId(SubscriptionId.create(subscriptionId));
        subscription = this.publisher.mergeObjectContext(subscription);
        subscription.register();
        subscription.commit();
        return subscriptionId;
    }
}