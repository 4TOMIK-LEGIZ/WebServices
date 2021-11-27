
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QualificationController } from "./api/qualification.controller";
import { RegisterQualificationHandler } from "./application/handlers/commands/register-qualification.handler";
import { QualificationRegisteredHandler} from "./application/handlers/events/qualification-registered.handler";
import { RegisterQualificationValidator } from "./application/validators/qualification.validator";
import { QualificationTypeORM } from "./infrastructure/persistence/typeorm/entities/qualification.typeorm";
import {QualificationsApplicationService} from "./application/services/qualification-application.service";

export const CommandHandlers = [RegisterQualificationHandler];
export const EventHandlers = [QualificationRegisteredHandler];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([QualificationTypeORM]),
    ],
    controllers: [QualificationController],
    providers: [
        QualificationsApplicationService,
        RegisterQualificationValidator,
        ...CommandHandlers,
        ...EventHandlers,
    ]
})

export class QualificationModule {}