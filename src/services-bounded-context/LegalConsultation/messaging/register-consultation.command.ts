export class RegisterlegalConsultationCommand {
    constructor(
      public readonly lawyerid: number,
      public readonly customerid: number,
      public readonly document: document,
      public readonly coment: string,
      public readonly cost: money,
    ) {}
  }