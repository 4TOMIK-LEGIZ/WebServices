
export class RegisterServiceQualificationRequestDto {
    constructor(
        public readonly lawyerid: number,
        public readonly customerid: number,
        public readonly feedback: string,
        public readonly qualification: number,
        public readonly qDate: Date,
    ) {}
}

export class RegisterServiceQualificationResponseDto {
    constructor(
        public id: number,
        public readonly lawyerid: number,
        public readonly feedback: string,
        public readonly qualification: number,
        public readonly qDate: Date,
    ) {}
}