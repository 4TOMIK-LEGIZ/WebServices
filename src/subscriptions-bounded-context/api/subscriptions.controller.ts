import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import { Result } from "typescript-result";
import { RegisterSubscriptionRequestDto} from "../application/dtos/request/register-subscription-request.dto";
import { RegisterSubscriptionResponseDto } from "../application/dtos/response/register-subscription-response.dto";
import { SubscriptionsApplicationService } from "../application/services/subscriptions-application.service";
import {QueryBus} from "@nestjs/cqrs";
import {GetSubscriptionsQuery} from "../application/queries/get-subscriptions.query";
import {ApiController} from "../../common/api/api.controller";
import {AppNotification} from "../../common/application/app.notification";

@Controller('subscriptions')
export class SubscriptionsController {
    constructor(
        private readonly subscriptionApplicationService : SubscriptionsApplicationService,
        private readonly queryBus: QueryBus,
    ) {}

    @Post()
    async register(
        @Body() registerSubscriptionRequestDto: RegisterSubscriptionRequestDto,
        @Res({ passthrough: true }) response,
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterSubscriptionResponseDto> =
                await this.subscriptionApplicationService.register(
                    registerSubscriptionRequestDto,
                );
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get()
    async getSubscriptions(@Res({ passthrough: true }) response) : Promise<object> {
        try {
            const subscriptions = await this.queryBus.execute(new GetSubscriptionsQuery());
            return ApiController.ok(response, subscriptions);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }
}