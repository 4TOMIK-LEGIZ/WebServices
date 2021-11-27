
import {AggregateRoot} from "@nestjs/cqrs";
import {LegalConsultationId} from "../value-objects/legal-consultation-id.value";
import {LawDocument} from "../value-objects/law-document.value";
import {LawComment} from "../value-objects/law-comment.value";
import {LegalConsultationRegisteredEvent} from "../event/legal-consultation-registered.event";
import {Cost} from "../value-objects/cost.value";


export class LegalConsultation extends AggregateRoot {
    private id: LegalConsultationId;
    private lawDocument: LawDocument;
    private lawComment: LawComment;
    private cost: Cost;
  
    public constructor(id: LegalConsultationId, lawDocument: LawDocument, lawComment: LawComment, cost: Cost) {
      super();
      this.id = id;
      this.lawDocument = lawDocument;
      this.lawComment = lawComment;
      this.cost = cost;
    }
  
    public register() {
      const event = new LegalConsultationRegisteredEvent (
          this.id.getValue(),
          this.lawDocument.getValue(),
          this.lawComment.getValue(),
          this.cost.getValue()
      );
      this.apply(event);
    }

    public getId(): LegalConsultationId {
        return this.id;
    }

    public getLawDocument(): LawDocument {
        return this.lawDocument;
    }

    public getLawComment(): LawComment {
        return this.lawComment;
    }

    public getCost(): Cost {
        return this.cost;
    }

    public changeId(id: LegalConsultationId) {
        this.id = id;
    }
  }