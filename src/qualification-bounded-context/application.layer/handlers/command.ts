
//Command

import { CommandHandler, EventPublisher, ICommandHandler } from "@nestjs/cqrs";
import { InjectRepository } from "@nestjs/typeorm";
import { InsertResult, Repository } from "typeorm";
import { ServiceQualificationSchema } from "../../infrastructure.layer";

@CommandHandler(RegisterServiceQualificationCommand)
export class RegisterServiceQualificationHandler
    implements ICommandHandler<RegisterServiceQualificationCommand> {
        constructor(
            @InjectRepository(ServiceQualificationSchema)
            private ServiceQualificationRepository: Repository<ServiceQualification>,
            private publisher: EventPublisher,
        ) {}
        async execute(command: RegisterServiceQualificationCommand) {
            const ServiceQualificationEntity = ServiceQualificationFactory.createForm(command.lawyerid,
    command.customerid, command.feedback, command.qualification, command.qDate);
            const insertResult:InsertResult = await
    this.ServiceQualificationRepository.insert(ServiceQualificationEntity);
            const ServiceQualificationId:number = Number(insertResult.identifiers[0].id);
            ServiceQualificationEntity.changeId(ServiceQualificationId);
            const ServiceQualification = this.publisher.mergeObjectContext(ServiceQualificationEntity);
            ServiceQualification.register();
            ServiceQualification.commit();
            return ServiceQualificationId;
        }
    }