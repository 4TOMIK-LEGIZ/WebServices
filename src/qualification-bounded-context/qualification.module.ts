
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QualificationController } from "./api/qualification.controller";
import { CompleteQualificationHandler } from "./application/handlers/commands/complete-qualification.handler";
import { QualificationQualifiedHandler} from "./application/handlers/events/qualification.qualified.handler";
import { QualificationApplicationService } from "./application/services/qualification-application.service";
import { RegisterQualificationValidator } from "./application/validators/qualification.validator";
import { QualificationTypeORM } from "./infrastructure/entities/qualification.typeorm";

export const CommandHandlers = [CompleteQualificationHandler];
export const EventHandlers = [QualificationQualifiedHandler];
export const QueryHandlers = [];

@Module({
    imports: [
        CqrsModule,
        TypeOrmModule.forFeature([QualificationTypeORM]),
    ],
    controllers: [QualificationController],
    providers: [
        QualificationApplicationService,
        RegisterQualificationValidator,
        ...CommandHandlers,
        ...EventHandlers,
        ...QueryHandlers
    ]
})

export class QualificationModule {}