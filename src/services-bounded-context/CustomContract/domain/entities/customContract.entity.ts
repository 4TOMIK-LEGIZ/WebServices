import {AggregateRoot} from "@nestjs/cqrs";
import {CustomContractId} from "../value-objects/custom-contract-id.value";
import {LawDescription} from "../value-objects/law-description.value";
import {StartedAt} from "../value-objects/started-at.value";
import {FinishedAt} from "../value-objects/finished-at.value";
import {Cost} from "../value-objects/cost.value";
import {CustomContractRegisteredEvent} from "../events/custom-contract-registered.event";

export class CustomContract extends AggregateRoot {
    private id: CustomContractId;
    private lawDescription: LawDescription;
    private startedAt: StartedAt;
    private finishedAt: FinishedAt;
    private cost: Cost;
  
    public constructor(id: CustomContractId, lawDescription: LawDescription, startedAt: StartedAt, finishedAt: FinishedAt ,cost: Cost) {
      super();
      this.id = id;
      this.lawDescription = lawDescription;
      this.startedAt = startedAt;
      this.finishedAt = finishedAt;
      this.cost = cost;
    }
  
    public register() {
      const event = new CustomContractRegisteredEvent (
          this.id.getValue(),
          this.lawDescription.getValue(),
          this.startedAt.getValue(),
          this.finishedAt.getValue(),
          this.cost.getValue()
      );
      this.apply(event);
    }

    public getId(): CustomContractId {
        return this.id;
    }

    public getLawDescription(): LawDescription {
        return this.lawDescription;
    }

    public getStartedAt(): StartedAt {
        return this.startedAt;
    }

    public getFinishedAt(): FinishedAt {
        return this.finishedAt;
    }

    public getCost(): Cost {
        return this.cost;
    }

    public changeId(id: CustomContractId) {
        this.id = id;
    }

  }