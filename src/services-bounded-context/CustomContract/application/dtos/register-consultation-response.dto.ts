import {Money} from "../../../../common/domain/value-objects/money.value";

export class RegisterlegalConsultationResponseDto {
    constructor(
      public id: number,
      public readonly lawyerid: number,
      public readonly customerid: number,
      public readonly document: Document,
      public readonly coment: string,
      public readonly cost: Money,
    ) {}
  }