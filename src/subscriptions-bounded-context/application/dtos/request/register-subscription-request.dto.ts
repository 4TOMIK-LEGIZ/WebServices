export class RegisterSubscriptionRequestDto {
    constructor(
        public readonly price: string,
        public readonly description: string
    ) {}
}