import { Injectable } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterQualificationRequestDto } from "../dtos/request/register-qualification-request.dto";
import { RegisterQualificationResponseDto } from "../dtos/response/register.qualification.response.dto";
import { RegisterQualificationValidator } from "../validators/qualification.validator";
import {RegisterQualificationCommand} from "../commands/register-qualification.command";

@Injectable()
export class QualificationsApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerQualificationValidator: RegisterQualificationValidator,
    ) {}
    async register(
        registerQualificationRequestDto: RegisterQualificationRequestDto
    ): Promise<Result<AppNotification, RegisterQualificationResponseDto>> {
        const notification: AppNotification =
            await this.registerQualificationValidator.validate(registerQualificationRequestDto);
        if(notification.hasErrors()) {
            return Result.error(notification);
        }
        const registerQualificationCommand: RegisterQualificationCommand =
            new RegisterQualificationCommand(
                registerQualificationRequestDto.score,
                registerQualificationRequestDto.textDescription
            );
        const qualificationId= await this.commandBus.execute(registerQualificationCommand);
        const registerQualificationResponseDto: RegisterQualificationResponseDto =
            new RegisterQualificationResponseDto(
            qualificationId,
            registerQualificationRequestDto.score,
            registerQualificationRequestDto.textDescription,
        );
        return Result.ok(registerQualificationResponseDto);
    }
}