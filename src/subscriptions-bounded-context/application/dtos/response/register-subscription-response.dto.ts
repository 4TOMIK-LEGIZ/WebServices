export class RegisterSubscriptionResponseDto {
    constructor(
        public id: number,
        public readonly price: string,
        public readonly description: string
    ) {}
}