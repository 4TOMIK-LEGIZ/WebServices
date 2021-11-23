import {Column, Entity, Unique} from "typeorm";
import {type} from "os";
import {CustomContractIdTypeorm} from "./customContract.id.typeorm";
import {StartDateTypeORM} from "./startdate.typeorm";
import {LawyerIdTypeORM} from "./lawyer.id.typeorm";
import {CustomerIdTypeORM} from "./customer.id.typeorm";
import {DescriptionTypeORM} from "./description.typeorm";
import {CostTypeORM} from "./cost.typeorm";
import {EndDateTypeORM} from "./enddate.typeorm";

class CustomContractIdTypeORM {
}

@Entity('customContract')
@Unique('UQ_customContract_description',['description.value'])
export class CustomContractTypeorm {
    @Column((type)=> CustomContractTypeorm,{prefix:false})
    public id: CustomContractIdTypeORM;

    @Column((type)=> DescriptionTypeORM,{prefix: false})
    public document: DescriptionTypeORM;

    @Column((type)=> LawyerIdTypeORM,{prefix: false})
    public lawyerid: LawyerIdTypeORM;

    @Column((type)=> CustomerIdTypeORM,{prefix: false})
    public customerid: CustomerIdTypeORM;

    @Column((type)=> StartDateTypeORM,{prefix: false})
    public start_date: StartDateTypeORM;

    @Column((type)=> EndDateTypeORM,{prefix: false})
    public end_date: EndDateTypeORM;

    @Column((type)=> CostTypeORM,{prefix: false})
    public cost: CostTypeORM;

}
