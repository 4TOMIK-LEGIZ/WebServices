import {CustomContract} from "../../domain/entities/customContract.entity";
import {FinishedAtTypeORM} from "../../infrastructure/persistence/typeorm/entities/finished-at.typeorm";
import {StartedAtTypeORM} from "../../infrastructure/persistence/typeorm/entities/started-at.typeorm";
import {LawDescriptionTypeORM} from "../../infrastructure/persistence/typeorm/entities/law-description.typeorm";
import {CustomContractTypeORM} from "../../infrastructure/persistence/typeorm/entities/custom-contract.typeorm";
import {CostTypeORM} from "../../infrastructure/persistence/typeorm/entities/cost.typeorm";
import {CustomContractIdTypeORM} from "../../infrastructure/persistence/typeorm/entities/custom-contract.id.typeorm";

export class CustomContractMapper {
    public static toTypeORM(customContract: CustomContract): CustomContractTypeORM {
        const customContractTypeORM: CustomContractTypeORM = new CustomContractTypeORM();
        customContractTypeORM.id = CustomContractIdTypeORM.from(customContract.getId().getValue());
        customContractTypeORM.lawDescription= LawDescriptionTypeORM.from(customContract.getLawDescription().getValue());
        customContractTypeORM.startedAt = StartedAtTypeORM.from(customContract.getStartedAt().getValue());
        customContractTypeORM.finishedAt = FinishedAtTypeORM.from(customContract.getFinishedAt().getValue());
        customContractTypeORM.cost = CostTypeORM.from(customContract.getCost().getValue());
        return customContractTypeORM;
    }
}