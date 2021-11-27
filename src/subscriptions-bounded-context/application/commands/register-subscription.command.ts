export class RegisterSubscriptionCommand {
    constructor(
        public readonly price: string,
        public readonly description: string,
    ) {}
}