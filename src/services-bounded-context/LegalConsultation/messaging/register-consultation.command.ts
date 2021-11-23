import {Money} from "../../../common/domain/value-objects/money.value";

export class RegisterlegalConsultationCommand {
    constructor(
        public readonly lawyerid: Document,
        public readonly customerid: number,
        public readonly document: number,
        public readonly coment: string,
        public readonly cost: Money,
    ) {}
  }