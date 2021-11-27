export class QualificationRegisteredEvent {
    constructor(
      public readonly id: number,
      public readonly score: string,
      public readonly textDescription: string
    ){
    }
}