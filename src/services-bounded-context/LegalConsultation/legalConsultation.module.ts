import {Module} from "@nestjs/common";
import {CqrsModule} from "@nestjs/cqrs";
import {TypeOrmModule} from "@nestjs/typeorm";
import {legalConsultationController} from "./api/legalConsultation.controller";
import {RegisterLegalConsultationHandler} from "./application/handlers/commands/register-consultation.handler";
import {LegalConsultationRegisteredHandler} from "./application/handlers/events/consultation-registered.handler";
import {LegalConsultationTypeORM} from "./infrastructure/persistence/typeorm/entities/legal-consultation.typeorm";
import {LegalConsultationsApplicationService} from "./application/services/consultation-application.service";
import {RegisterLegalConsultationValidator} from "./application/validators/register-consultation.validator";

export const CommandHandlers = [RegisterLegalConsultationHandler];
export const EventHandlers = [LegalConsultationRegisteredHandler];

@Module({
    imports:[
        CqrsModule,
        TypeOrmModule.forFeature([LegalConsultationTypeORM]),
    ],
    controllers: [legalConsultationController],
    providers: [
        LegalConsultationsApplicationService,
        RegisterLegalConsultationValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ]
})
export class LegalConsultationModule{}