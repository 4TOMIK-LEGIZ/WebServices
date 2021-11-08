export class RegisterSubscriptionResponseDto {
    constructor(
        public id: number,
        public readonly price: number,
        public readonly description: string
    ) {}
}