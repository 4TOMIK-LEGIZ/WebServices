export class RegisterSubscriptionCommand {
    constructor(
        public readonly price: number,
        public readonly description: string,
    ) {}
}