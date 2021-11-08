import { Money } from "src/common/domain/value-objects/money.value";

  export class legalConsultationRegisteredEvent {
    constructor(
      public id: number,
      public readonly document: Document,
      public readonly lawyerid: number,
      public readonly customerid: number,
      public readonly coment: string,
      public readonly cost: Money,
    ) {}
  }