import {Column, Entity, Unique} from "typeorm";
import {CustomContractIdTypeORM} from "./custom-contract.id.typeorm";
import {LawDescriptionTypeORM} from "./law-description.typeorm";
import {StartedAtTypeORM} from "./started-at.typeorm";
import {FinishedAtTypeORM} from "./finished-at.typeorm";
import {CostTypeORM} from "./cost.typeorm";


@Entity('customContracts')
export class CustomContractTypeORM {
    @Column((type)=> CustomContractIdTypeORM,{prefix:false})
    public id: CustomContractIdTypeORM;

    @Column((type)=> LawDescriptionTypeORM,{prefix: false})
    public lawDescription: LawDescriptionTypeORM;

    @Column((type)=> StartedAtTypeORM,{prefix: false})
    public startedAt: StartedAtTypeORM;

    @Column((type)=> FinishedAtTypeORM,{prefix: false})
    public finishedAt: FinishedAtTypeORM;

    @Column((type)=> CostTypeORM,{prefix: false})
    public cost: CostTypeORM;

}
