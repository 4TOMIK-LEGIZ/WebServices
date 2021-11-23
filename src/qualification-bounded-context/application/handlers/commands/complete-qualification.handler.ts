import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { QualificationStatus } from "src/qualification-bounded-context/domain/enums/qualification.status";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/entities/qualification.typeorm";
import { Repository } from "typeorm";
import { CompleteQualification } from "../../commands/complete-qualification.command";

@CommandHandler(CompleteQualification)
export class CompleteQualificationHandler implements ICommandHandler<CompleteQualification> {
    constructor(@InjectRepository(QualificationTypeORM)
    private qualificationRepository: Repository<QualificationTypeORM>
    ) {
    }

    async execute(command: CompleteQualification) {
        const qualificationId: number = command.qualificationId;
        let qualificationTypeORM: QualificationTypeORM = await this.qualificationRepository
        .createQueryBuilder()
        .where("id = :id")
        .setParameter("id", qualificationId)
        .getOne();
        if(qualificationTypeORM == null) {
            return false;
        }
        qualificationTypeORM.status = QualificationStatus.DONE;
        qualificationTypeORM = await this.qualificationRepository.save(qualificationTypeORM);
        if(qualificationTypeORM == null) {
            return false;
        }
        return true;
    }
}