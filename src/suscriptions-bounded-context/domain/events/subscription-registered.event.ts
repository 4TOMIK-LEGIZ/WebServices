export class SubscriptionRegisteredEvent {
    constructor(
        public readonly id: number,
        public readonly price: string,
        public readonly description: string
    ) {}
}