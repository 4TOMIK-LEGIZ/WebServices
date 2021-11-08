export class RegisterSubscriptionRequestDto {
    constructor(
        public readonly price: number,
        public readonly description: string
    ) {}
}