import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";

import {CustomContractTypeORM} from "./infrastructure/persistence/typeorm/entities/custom-contract.typeorm";
import {CustomContractController} from "./api/customContract.controller";
import {RegisterCustomContractValidator} from "./application/validators/register-contract.validator";
import {CustomContractsApplicationService} from "./application/services/custom-contracts-application.service";
import {RegisterCustomContractHandler} from "./application/handlers/commands/contract-registered.handler";
import {CustomContractRegisteredHandler} from "./application/handlers/events/register-contract.handler";


export const CommandHandlers = [RegisterCustomContractHandler];
export const EventHandlers = [CustomContractRegisteredHandler];

@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([CustomContractTypeORM]),
    ],
    controllers: [CustomContractController],
    providers: [
        CustomContractsApplicationService,
        RegisterCustomContractValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ]
})
export class CustomContractModule {}