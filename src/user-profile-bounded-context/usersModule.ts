import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import {RegisterLawyerHandler} from "./application/handlers/commands/register-lawyer.handler";
import {LawyerRegisteredHandler} from "./application/handlers/events/lawyer-registered.handler";
import {UsersController} from "./api/users.controller";
import {LawyersApplicationService} from "./application/services/lawyers-application.service";
import {LawyerTypeORM} from "./infrastructure/persistence/typeorm/entities/lawyer.typeorm";
import {RegisterLawyerValidator} from "./application/validators/register-lawyer.validator";
import {GetLawyersHandler} from "./application/handlers/queries/get-lawyers.handler";
import {UserTypeORM} from "./infrastructure/persistence/typeorm/entities/user.typeorm";
import {RegisterCustomerHandler} from "./application/handlers/commands/register-customer.handler";
import {CustomerRegisteredHandler} from "./application/handlers/events/customer-registered.handler";
import {GetCustomersHandler} from "./application/handlers/queries/get-customers.handler";
import {CustomerTypeORM} from "./infrastructure/persistence/typeorm/entities/customer.typeorm";
import {CustomersApplicationService} from "./application/services/customers-application.service";
import {RegisterCustomerValidator} from "./application/validators/register-customer.validator";

export const CommandHandlers = [RegisterLawyerHandler, RegisterCustomerHandler];
export const EventHandlers = [LawyerRegisteredHandler, CustomerRegisteredHandler];
export const QueryHandlers = [GetLawyersHandler, GetCustomersHandler];

@Module({
    imports: [CqrsModule, TypeOrmModule.forFeature([UserTypeORM, LawyerTypeORM, CustomerTypeORM])],
    exports: [TypeOrmModule],
    controllers: [UsersController],
    providers: [
        LawyersApplicationService,
        CustomersApplicationService,
        RegisterLawyerValidator,
        RegisterCustomerValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ],
})
export class UsersModule {}