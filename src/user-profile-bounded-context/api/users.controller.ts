import {Body, Controller, Get, Post, Res} from "@nestjs/common";
import {QueryBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";
import {AppNotification} from "../../common/application/app.notification";
import {ApiController} from "../../common/api/api.controller";
import {LawyersApplicationService} from "../application/services/lawyers-application.service";
import {RegisterLawyerRequest} from "../application/dtos/request/register-lawyer.request.dto";
import {RegisterLawyerResponse} from "../application/dtos/response/register-lawyer-response.dto";
import {GetLawyersQuery} from "../application/queries/get-lawyers.query";
import {RegisterCustomerRequest} from "../application/dtos/request/register-customer.request.dto";
import {RegisterCustomerResponse} from "../application/dtos/response/register-customer.response.dto";
import {GetCustomersQuery} from "../application/queries/get-customers.query";
import {CustomersApplicationService} from "../application/services/customers-application.service";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";

@Controller('users')
export class UsersController {
    constructor(
        private readonly lawyersApplicationService: LawyersApplicationService,
        private readonly customerApplicationService: CustomersApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post('/lawyer')
    @ApiCreatedResponse({description: 'Customer Registration'})
    async registerLawyer(
        @Body() registerLawyerRequest: RegisterLawyerRequest,
        @Res({ passthrough: true}) response,
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterLawyerResponse> =
                await this.lawyersApplicationService.register(
                    registerLawyerRequest,
                );
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Post('/customer')    
    @ApiCreatedResponse({description: 'Customer Registration'})
    async registerCustomer(
        @Body() registerCustomerRequest: RegisterCustomerRequest,
        @Res({ passthrough: true}) response,
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterCustomerResponse> =
                await this.customerApplicationService.register(
                    registerCustomerRequest,
                );
            if (result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get('/lawyer')
    async getLawyers(@Res({ passthrough: true }) response): Promise<object> {
        try {
            const lawyers = await this.queryBus.execute(new GetLawyersQuery());
            return ApiController.ok(response, lawyers);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

    @Get('/customer')
    @ApiOkResponse({description: 'The resource list has been successfully returned'})
    async getCustomers(@Res({ passthrough: true }) response): Promise<object> {
        try {
            const customers = await this.queryBus.execute(new GetCustomersQuery());
            return ApiController.ok(response, customers);
        } catch (error) {
            return ApiController.serverError(response, error);
        }
    }

}