export class CustomContractRegisteredEvent {
    constructor(
        public readonly id: number,
        public readonly lawDescription: string,
        public readonly startedAt: string,
        public readonly finishedAt: string,
        public readonly cost: string
    ) {}
}