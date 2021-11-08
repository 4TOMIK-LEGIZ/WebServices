import { CommandBus } from "@nestjs/cqrs";
import { Injectable } from "@nestjs/common";
import { RegisterSubscriptionRequestDto } from "../dtos/request/register-subscription-request.dto";
import { Result } from "typescript-result";
import { RegisterSubscriptionResponseDto } from "../dtos/response/register-subscription-response.dto";
import { AppNotification } from "../../shared/application/app.notification";
import { RegisterSubscriptionValidator } from "../validators/register-subscription.validator";
import { RegisterSubscriptionCommand } from "../commands/register-subscription.command";

@Injectable()
export class SubscriptionsApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerSubscriptionValidator: RegisterSubscriptionValidator,
    ) {}

    async register(
        registerSubscriptionRequestDto: RegisterSubscriptionRequestDto,
    ): Promise<Result<AppNotification, RegisterSubscriptionResponseDto>> {
        const notification: AppNotification =
            await this.registerSubscriptionValidator.validate(registerSubscriptionRequestDto);
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        const registerSubscriptionCommand: RegisterSubscriptionCommand =
            new RegisterSubscriptionCommand(
                registerSubscriptionRequestDto.price,
                registerSubscriptionRequestDto.description,
            );
        const subscriptionId = await this.commandBus.execute(registerSubscriptionCommand);
        const registerSubscriptionResponseDto: RegisterSubscriptionResponseDto =
            new RegisterSubscriptionResponseDto(
                subscriptionId,
                registerSubscriptionRequestDto.price,
                registerSubscriptionRequestDto.description
            );
        return Result.ok(registerSubscriptionResponseDto);
    }
}