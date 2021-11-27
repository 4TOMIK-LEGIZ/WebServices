export class RegisterLegalConsultationCommand {
    constructor(
        public readonly lawDocument: string,
        public readonly lawComment: string,
        public readonly cost: string,
    ) {}
}