import {Money} from "../../../../../common/domain/value-objects/money.value";

export class RegisterCustomContractRequestDto {
  constructor(
    public readonly description: string,
    public readonly lawyerid: number,
    public readonly customerid: number,
    public readonly start_date: string,
    public readonly end_date: string,
    public readonly cost: Money,
  ) {}
}
