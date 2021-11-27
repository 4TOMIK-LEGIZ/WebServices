import { CustomContract } from "../entities/customContract.entity";
import {LawDescription} from "../value-objects/law-description.value";
import {StartedAt} from "../value-objects/started-at.value";
import {FinishedAt} from "../value-objects/finished-at.value";
import {Cost} from "../value-objects/cost.value";
import {CustomContractId} from "../value-objects/custom-contract-id.value";

export class CustomContractFactory {
    public static createFrom(lawDescription: LawDescription, startedAt: StartedAt, finishedAt: FinishedAt, cost: Cost): CustomContract {
      return new CustomContract(CustomContractId.create(0), lawDescription, startedAt, finishedAt, cost);
    }

  }