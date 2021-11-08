import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { SubscriptionsController } from "./api/subscriptions.controller";
import { SubscriptionsApplicationService } from "./application/services/subscriptions-application.service";
import { RegisterSubscriptionValidator } from "./application/validators/register-subscription.validator";
import { SubscriptionTypeORM } from "./infrastructure/persistence/typeorm/entities/subscription.typeorm";
import { RegisterSubscriptionHandler } from "./application/handlers/commands/register-subscription.handler";
import { SubscriptionRegisteredHandler } from "./application/handlers/events/subscription-registered.handler";

export const CommandHandlers = [RegisterSubscriptionHandler];
export const EventHandlers = [SubscriptionRegisteredHandler];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([SubscriptionTypeORM])],
    controllers: [SubscriptionsController],
    providers: [
        SubscriptionsApplicationService,
        RegisterSubscriptionValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ],
})
export class SuscriptionsModule {}