import { Qualification } from "../entities/qualification.entity";
import { QualificationStatus } from "../enums/qualification.status";

export class QualificationFactory {
    public static createFrom(
        status: QualificationStatus): Qualification {
            return new Qualification(status);
        }
}