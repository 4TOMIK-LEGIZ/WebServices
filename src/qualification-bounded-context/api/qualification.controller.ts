import { Body, Controller, Post, Res } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { ApiController } from "src/common/api/api.controller";
import { AppNotification } from "src/common/application/app.notification";
import { Result } from "typescript-result";
import { RegisterQualificationRequestDto } from "../application/dtos/request/register.qualification.request.dto";
import { RegisterQualificationResponseDto } from "../application/dtos/response/register.qualification.response.dto";
import { ServiceQualificationApplicationService } from "../application/services/qualification-application.service";


@Controller('qualifications')
export class QualificationController {
    constructor (
        private readonly ServiceQualificationApplicationService: ServiceQualificationApplicationService,
        private readonly queryBus: QueryBus
    ) {}

    @Post()
    async register(
        @Body() registerServiceQualificationRequestDto: RegisterQualificationRequestDto,
        @Res({passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterQualificationResponseDto> = await
    this.ServiceQualificationApplicationService.register(registerServiceQualificationRequestDto);
            if(result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
          console.log(error);
          return ApiController.serverError(response, error);
        }
    }
}