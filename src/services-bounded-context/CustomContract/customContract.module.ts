import {Module} from "@nestjs/common";
import {CqrsModule, QueryHandler} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {CustomContractTypeorm} from "./infrastructure/persistence/typeorm/entities/customContract.typeorm";
import {customContractController} from "./api/customContract.controller";
import {legalConsultationApplicationService} from "./application/services/contract-application.service";
import {RegisterlegalConsultationValidator} from "./application/validators/register-contract.validator";
import {RegisterlegalConsultationHandler} from "./application/handlers/commands/contract-registered.handler";
import {legalConsultationRegisteredHandler} from "./application/handlers/events/register-contract.handler";

export const CommandHandlers = [RegisterlegalConsultationHandler];
export const EventHandlers = [legalConsultationRegisteredHandler];

@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([CustomContractTypeorm]),
    ],
    controllers: [customContractController],
    providers: [
        legalConsultationApplicationService,
        RegisterlegalConsultationValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ]
})
export class CustomContractModule {}