import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ServiceQualificationSchema } from "../infrastructure.layer";
import { RegisterServiceQualificationRequestDto } from "./dtos";

@Injectable()
export class RegisterServiceQualificationValidator {
    constructor(
        @InjectRepository(ServiceQualificationSchema)
        private ServiceQualificationRepository: Repository<Customer>,
    ) {}

    public async validate(
        registerServiceQualificationRequestDto: RegisterServiceQualificationRequestDto,
    ): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const lawyer: number = registerServiceQualificationRequestDto.lawyerid.trim();
        if(lawyerid.length <= 0) {
            notification.addError('ServiceQualification lawyerid is required', null);
        }
        const customerid: number = registerServiceQualificationRequestDto.customerid.trim();
        if(customerid.length <= 0) {
            notification.addError('ServiceQualification customerid is required', null);
        }
        const feedback: string = registerServiceQualificationRequestDto.feedback.trim();
        if(feedback.length <= 0) {
            notification.addError('ServiceQualification feedback is required', null);
        }
        const qualification: number = registerServiceQualificationRequestDto.qualification.trim();
        if(qualification.length <= 0) {
            notification.addError('ServiceQualification qualification is required', null);
        }
        const qDate: Date = registerServiceQualificationRequestDto.qDate.trim();
        if(qDate.length <= 0) {
            notification.addError('ServiceQualification qDate is required', null);
        }
        if(notification.hasErrors()) {
            return notification;
        }
        return notification;
    }
}
