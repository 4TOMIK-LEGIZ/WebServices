export class RegisterLegalConsultationRequestDto {
  constructor(
    public readonly lawDocument: string,
    public readonly lawComment: string,
    public readonly cost: string
  ) {}
}
