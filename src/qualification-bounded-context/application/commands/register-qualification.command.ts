export class RegisterQualificationCommand {
    constructor(
        public readonly score: string,
        public readonly textDescription: string
    ) {}
}