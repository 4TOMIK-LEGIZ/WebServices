export class RegisterCustomContractResponseDto {
    constructor(
      public id: number,
      public readonly lawDescription: string,
      public readonly startedAt: string,
      public readonly finishedAt: string,
      public readonly cost: string,
    ) {}
}