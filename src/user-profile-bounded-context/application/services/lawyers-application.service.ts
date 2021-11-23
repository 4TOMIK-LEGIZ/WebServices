import {Injectable} from "@nestjs/common";
import {CommandBus} from "@nestjs/cqrs";
import {Result} from "typescript-result";
import {AppNotification} from "../../../common/application/app.notification";
import {RegisterLawyerRequest} from "../dtos/request/register-lawyer.request.dto";
import {RegisterLawyerResponse} from "../dtos/response/register-lawyer-response.dto";
import {RegisterLawyerValidator} from "../validators/register-lawyer.validator";
import {RegisterLawyer} from "../commands/register-lawyer.command";

@Injectable()
export class LawyersApplicationService {
    constructor(
        private commandBus: CommandBus,
        private registerLawyerValidator: RegisterLawyerValidator,
    ) {}

    async register(
        registerLawyerRequest: RegisterLawyerRequest,
    ): Promise<Result<AppNotification, RegisterLawyerResponse>> {
        const notification: AppNotification =
            await this.registerLawyerValidator.validate(registerLawyerRequest);
        if (notification.hasErrors()) {
            return Result.error(notification);
        }
        const registerLawyer: RegisterLawyer =
            new RegisterLawyer(
                registerLawyerRequest.username, registerLawyerRequest.password, registerLawyerRequest.email,
                registerLawyerRequest.phone, registerLawyerRequest.lawyerName, registerLawyerRequest.lawyerLastName,
                registerLawyerRequest.district, registerLawyerRequest.university, registerLawyerRequest.priceLegalAdvice,
                registerLawyerRequest.priceCustomContract,);
        const lawyerId = await this.commandBus.execute(registerLawyer);
        const registerLawyerResponse: RegisterLawyerResponse =
            new RegisterLawyerResponse(
                lawyerId, registerLawyerRequest.username, registerLawyerRequest.password, registerLawyerRequest.email,
                registerLawyerRequest.phone, registerLawyerRequest.lawyerName, registerLawyerRequest.lawyerLastName,
                registerLawyerRequest.district, registerLawyerRequest.university, registerLawyerRequest.priceLegalAdvice,
                registerLawyerRequest.priceCustomContract,);
        return Result.ok(registerLawyerResponse);
    }
}