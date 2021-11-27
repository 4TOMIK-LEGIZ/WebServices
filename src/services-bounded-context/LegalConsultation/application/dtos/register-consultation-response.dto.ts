export class RegisterLegalConsultationResponseDto {
    constructor(
      public id: number,
      public readonly lawDocument: string,
      public readonly lawComment: string,
      public readonly cost: string
    ) {}
  }