export class RegisterQualificationResponseDto {
    constructor(
        public id: number,
        public readonly lawyerid: number,
        public readonly feedback: string,
        public readonly qualification: number,
        public readonly qDate: Date,
    ) {}
}