export class RegisterQualificationRequestDto {
    constructor(
        public readonly lawyerid: number,
        public readonly customerid: number,
        public readonly feedback: string,
        public readonly qualification: number,
        public readonly qDate: Date,
    ) {}
}