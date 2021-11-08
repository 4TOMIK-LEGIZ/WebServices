export class SubscriptionRegisteredEvent {
    constructor(
        public readonly id: number,
        public readonly price: number,
        public readonly description: string
    ) {}
}