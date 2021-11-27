export class RegisterQualificationResponseDto {
    constructor(
        public id: number,
        public readonly score: string,
        public readonly textDescription: string,
    ) {}
}