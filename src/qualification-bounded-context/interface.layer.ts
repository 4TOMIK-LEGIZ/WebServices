import { Controller } from "@nestjs/common";
import { Result } from "typescript-result";
import { RegisterServiceQualificationRequestDto, RegisterServiceQualificationResponseDto } from "./application.layer/dtos";

@Controller('ServiceQualification')
export class ServiceQualificationController {
    constructor (
        private readonly ServiceQualificationApplicationService: ServiceQualificationApplicationService,
    ) {}

    @Post()
    async register(
        @Body() registerServiceQualificationRequestDto: RegisterServiceQualificationRequestDto,
        @Res({passthrough: true }) response
    ): Promise<object> {
        try {
            const result: Result<AppNotification, RegisterServiceQualificationResponseDto> = await
    this.ServiceQualificationApplicationService.register(registerServiceQualificationRequestDto);
            if(result.isSuccess()) {
                return ApiController.created(response, result.value);
            }
            return ApiController.error(response, result.error.getErrors());
        } catch (error) {
          console.log(error);
          return ApiController.serverError(response);
        }
    }
}