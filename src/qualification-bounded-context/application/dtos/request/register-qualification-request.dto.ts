export class RegisterQualificationRequestDto {
    constructor(
        public readonly score: string,
        public readonly textDescription: string
    ) {}
}