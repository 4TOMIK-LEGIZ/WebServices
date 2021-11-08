export class SubscriptionId {
    private readonly value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static create(value: number) {
        return new SubscriptionId(value);
    }

    public getValue(): number {
        return this.value;
    }
}