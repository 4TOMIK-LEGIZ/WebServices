import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {AppNotification} from "../../../common/application/app.notification";
import {Result} from "typescript-result";
import {RegisterCustomer} from "../commands/register-customer.command";
import {RegisterCustomerResponse} from "../dtos/response/register-customer.response.dto";
import {RegisterCustomerRequest} from "../dtos/request/register-customer.request.dto";
import {RegisterCustomerValidator} from "../validators/register-customer.validator";

@Injectable()
export class CustomersApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerCustomerValidator: RegisterCustomerValidator
    ) {}

    async register(
        registerCustomerRequest: RegisterCustomerRequest,
    ): Promise<Result<AppNotification, RegisterCustomerResponse>> {
        const notification: AppNotification = await this.registerCustomerValidator.validate(registerCustomerRequest);
        if (notification.hasErrors()) { return Result.error(notification); }
        const registerCustomer: RegisterCustomer = new RegisterCustomer(
            registerCustomerRequest.username, registerCustomerRequest.password, registerCustomerRequest.email,
            registerCustomerRequest.phone, registerCustomerRequest.firstName, registerCustomerRequest.lastName,
            registerCustomerRequest.dni);
        const customerId: number = await this.commandBus.execute(registerCustomer);
        const registerResponse: RegisterCustomerResponse = new RegisterCustomerResponse(
            customerId,
            registerCustomerRequest.username, registerCustomerRequest.password, registerCustomerRequest.email,
            registerCustomerRequest.phone, registerCustomerRequest.firstName, registerCustomerRequest.lastName,
            registerCustomerRequest.dni
        );
        return Result.ok(registerResponse);
    }
}