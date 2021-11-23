import {Module} from "@nestjs/common";
import {CqrsModule, QueryHandler} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {LegalConsultationTypeORM} from "./infrastructure/persistence/typeorm/entities/legalConsultation.typeorm";
import {legalConsultationController} from "./api/legalConsultation.controller";
import {legalConsultationApplicationService} from "./application/services/consultation-application.service";
import {RegisterlegalConsultationValidator} from "./application/validators/register-consultation.validator";
import {RegisterlegalConsultationHandler} from "./application/handlers/consultation-registered.handler";
import {legalConsultationRegisteredHandler} from "./application/handlers/register-consultation.handler";

export const CommandHandlers = [RegisterlegalConsultationHandler];
export const EventHandlers = [legalConsultationRegisteredHandler];

@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([LegalConsultationTypeORM]),
    ],
    controllers: [legalConsultationController],
    providers: [
        legalConsultationApplicationService,
        RegisterlegalConsultationValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ]
})
export class LegalConsultationModule{}