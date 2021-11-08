[7:19 pm, 07/11/2021] Adrian: interface.layer.ts
[7:24 pm, 07/11/2021] Adrian: import { Controller } from "@nestjs/common";
import { Result } from "typescript-result";
import { customSerchLawyerService, SerchCustomerFilters } from "./application.layer/dtos";

@Controller('SerchLawyer')
export class SerchLawyerController {
  constructor(
    private readonly customSerchLawyerService: customSerchLawyerService,
  ) {}

  @Post()
  async serch(
    @Body() SerchCustomerFilters: SerchCustomerFilters,
    @Res({ passthrough: true }) response
  ): Promise<object> {
    try {
      const result: Result<AppNotification, SerchCustomerFilters> = await this.customSerchLawyerService.serch(SerchCustomerFilters);
      if (result.isSuccess()) {
          return ApiController.created(response, result.value);
      }
      return ApiController.error(response, result.error.getErrors());
    } catch (error) {
      console.log(error);
      return ApiController.serverError(response);
    }
  }
}