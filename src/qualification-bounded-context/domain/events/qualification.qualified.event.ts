import { QualificationStatus } from "../enums/qualification.status";

export class QualificationQualified {
    constructor(
      public readonly qualificationId: number,
      public status: QualificationStatus,
    ){
    }
}