export class RegisterlegalConsultationResponseDto {
    constructor(
      public id: number,
      public readonly lawyerid: number,
      public readonly customerid: number,
      public readonly document: document,
      public readonly coment: string,
      public readonly cost: money,
    ) {}
  }