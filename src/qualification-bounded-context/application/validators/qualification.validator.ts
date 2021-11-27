import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AppNotification } from "src/common/application/app.notification";
import { RegisterQualificationRequestDto } from "../dtos/request/register-qualification-request.dto";
import { QualificationTypeORM } from "src/qualification-bounded-context/infrastructure/persistence/typeorm/entities/qualification.typeorm";

@Injectable()
export class RegisterQualificationValidator {
    constructor(
        @InjectRepository(QualificationTypeORM)
        private qualificationRepository: Repository<QualificationTypeORM>,
    ) {}

    public async validate(
        registerQualificationRequestDto: RegisterQualificationRequestDto,
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        const score: string = registerQualificationRequestDto.score.trim();
        if (score.length <= 0) {
            notification.addError("Qualification score is required", null);
        }
        const textDescription:String = registerQualificationRequestDto.textDescription.trim();
        if (textDescription.length <= 0 ){
            notification.addError("Qualification textDescription is required", null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        return notification;
    }
}
