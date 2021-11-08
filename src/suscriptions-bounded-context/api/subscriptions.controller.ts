import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Result } from "typescript-result";
import { RegisterSubscriptionRequestDto} from "../application/dtos/request/register-subscription-request.dto";
import { RegisterSubscriptionResponseDto } from "../application/dtos/response/register-subscription-response.dto";
import { SubscriptionsApplicationService } from "../application/services/subscriptions-application.service";
import { AppNotification } from "../shared/application/app.notification";
import {ApiController} from "../shared/api/api.controller";

@Controller('lawyers/{lawyerId}/suscriptions')
export class SubscriptionsController {
    constructor(
        private readonly subscriptionApplicationService : SubscriptionsApplicationService,
    ) {}

    @Post()
    async register(
        @Body() registerCustomerRequestDto: RegisterSubscriptionRequestDto,
        @Res({ passthrough: true }) response,
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterSubscriptionResponseDto> =
                await this.subscriptionApplicationService.register(
                    registerCustomerRequestDto,
                );
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }
}