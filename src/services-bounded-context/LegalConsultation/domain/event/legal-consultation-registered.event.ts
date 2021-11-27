export class LegalConsultationRegisteredEvent {
    constructor(
        public readonly id: number,
        public readonly lawDocument: string,
        public readonly lawComment: string,
        public readonly cost: string,
    ) {}
}