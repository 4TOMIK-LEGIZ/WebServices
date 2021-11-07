import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { Result } from "typescript-result";
import { RegisterServiceQualificationRequestDto, RegisterServiceQualificationResponseDto } from "./dtos";
import { RegisterServiceQualificationValidator } from "./validators";

@Injectable()
export class ServiceQualificationApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerCustomerValidator: RegisterServiceQualificationValidator,
    ) {}
    async register(
        RegisterServiceQualificationRequestDto: RegisterServiceQualificationRequestDto,
    ): Promise<Result<AppNotification, RegisterServiceQualificationResponseDto>> {
        const notification: AppNotification = await this.ServiceQualificationCustomerValidator.validate(
            registerCustomerRequestDto,
        );
        if(notification.hasErrors()) {
            return Result.error(notification);
        }
        const registerServiceQualificationCommand: RegisterServiceQualificationCommand = new 
    RegisterServiceQualificationCommand(
            registerServiceQualificationRequestDto.lawyerid,
            registerServiceQualificationRequestDto.customerid,
            registerServiceQualificationRequestDto.feedback,
            registerServiceQualificationRequestDto.qualification,
            registerServiceQualificationRequestDto.qDate,
        );
        const ServiceQualificationId = await this.commandBus.execute(registerServiceQualificationCommand);
        const registerServiceQualificationResponseDto: RegisterServiceQualificationResponseDto = new
    RegisterServiceQualificationCommand(
            ServiceQualificationId,
            registerServiceQualificationRequestDto.lawyerid,
            registerServiceQualificationRequestDto.customerid,
            registerServiceQualificationRequestDto.feedback,
            registerServiceQualificationRequestDto.qualification,
            registerServiceQualificationRequestDto.qDate,
        );
        return Result.ok(registerServiceQualificationResponseDto);
    }
}