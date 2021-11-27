import { CommandHandler, ICommandHandler, EventPublisher } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/persistence/typeorm/entities/qualification.typeorm";
import { Repository } from "typeorm";
import {RegisterQualificationCommand} from "../../commands/register-qualification.command";
import {AppNotification} from "../../../../common/application/app.notification";
import { Result } from 'typescript-result';
import {Score} from "../../../domain/value-objects/score.value";
import {TextDescription} from "../../../domain/value-objects/text-description.value";
import {Qualification} from "../../../domain/entities/qualification.entity";
import {QualificationFactory} from "../../../domain/factories/qualification.factory";
import {QualificationMapper} from "../../mappers/qualification.mapper";
import {QualificationId} from "../../../domain/value-objects/qualification-id.value";

@CommandHandler(RegisterQualificationCommand)
export class RegisterQualificationHandler
    implements ICommandHandler<RegisterQualificationCommand>
{
    constructor(
        @InjectRepository(QualificationTypeORM)
        private qualificationRepository: Repository<QualificationTypeORM>,
        private publisher: EventPublisher
    ) {
    }

    async execute(command: RegisterQualificationCommand) {
        const scoreResult: Result<AppNotification, Score> = Score.create(command.score);
        if (scoreResult.isFailure()) {
            return 0;
        }

        const textDescriptionResult: Result<AppNotification, TextDescription> = TextDescription.create(command.textDescription);
        if (textDescriptionResult.isFailure()) {
            return 0;
        }

        let qualification: Qualification = QualificationFactory.createFrom(
            scoreResult.value,
            textDescriptionResult.value
        );
        let qualificationTypeORM = QualificationMapper.toTypeORM(qualification);
        qualificationTypeORM = await this.qualificationRepository.save(qualificationTypeORM);
        if (qualificationTypeORM == null) {
            return 0;
        }
        const qualificationId = Number(qualificationTypeORM.id.value);
        qualification.changeId(QualificationId.create(qualificationId));
        qualification = this.publisher.mergeObjectContext(qualification);
        qualification.register();
        qualification.commit();
        return qualificationId;
    }
}