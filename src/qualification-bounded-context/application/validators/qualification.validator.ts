import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { Customer } from "src/customers/domain/entities/customer.entity";
import { RegisterQualificationRequestDto } from "../dtos/request/register.qualification.request.dto";
import { Qualification } from "src/qualification-bounded-context/domain/entities/qualification.entity";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/entities/qualification.typeorm";

@Injectable()
export class RegisterQualificationValidator {
    constructor(
        @InjectRepository(QualificationTypeORM) private QualificationRepository: Repository<QualificationTypeORM>,
    ) {}

    public async validate(
        registerServiceQualificationRequestDto: RegisterQualificationRequestDto,
    ): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const lawyerid: number = registerServiceQualificationRequestDto.lawyerid.valueOf();
        if(lawyerid <= 0) {
            notification.addError('ServiceQualification lawyerid is required', null);
        }
        const customerid: number = registerServiceQualificationRequestDto.customerid.valueOf();
        if(customerid <= 0) {
            notification.addError('ServiceQualification customerid is required', null);
        }
        const feedback: string = registerServiceQualificationRequestDto.feedback.trim();
        if(feedback.length <= 0) {
            notification.addError('ServiceQualification feedback is required', null);
        }
        const qualification: number = registerServiceQualificationRequestDto.qualification.valueOf();
        if(qualification <= 0) {
            notification.addError('ServiceQualification qualification is required', null);
        }
        if(notification.hasErrors()) {
            return notification;
        }
        return notification;
    }
}
