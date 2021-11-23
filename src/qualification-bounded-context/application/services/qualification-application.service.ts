import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterQualificationRequestDto } from "../dtos/request/register.qualification.request.dto";
import { RegisterQualificationResponseDto } from "../dtos/response/register.qualification.response.dto";
import { RegisterQualificationValidator } from "../validators/qualification.validator";

@Injectable()
export class QualificationApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerCustomerValidator: RegisterQualificationValidator,
    ) {}
    async register(
        registerQualificationRequestDto: RegisterQualificationRequestDto): Promise<Result<AppNotification, RegisterQualificationResponseDto>> {
        const notification: AppNotification = await this.registerCustomerValidator.validate(registerQualificationRequestDto);
        if(notification.hasErrors()) {
            return Result.error(notification);
        }

        const registerQualificationResponseDto: RegisterQualificationResponseDto = new RegisterQualificationResponseDto(
            registerQualificationRequestDto.lawyerid,
            registerQualificationRequestDto.customerid,
            registerQualificationRequestDto.feedback,
            registerQualificationRequestDto.qualification,
            registerQualificationRequestDto.qDate,
        );
        return Result.ok(registerQualificationResponseDto);
    }
}