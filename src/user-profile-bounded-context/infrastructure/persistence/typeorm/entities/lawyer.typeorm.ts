import {ChildEntity, Column, Unique} from "typeorm";
import {LawyerNameTypeORM} from "../value-objects/lawyer-name.typeorm";
import {LawyerLastNameTypeORM} from "../value-objects/lawyer-last-name.typeorm";
import {DistrictTypeORM} from "../value-objects/district.typeorm";
import {UniversityTypeORM} from "../value-objects/university.typeorm";
import {PriceLegalAdviceTypeORM} from "../value-objects/price-legal-advice.typeorm";
import {PriceCustomContractTypeORM} from "../value-objects/price-custom-contract.typeorm";
import {UserType} from "../../../../domain/enums/user-type.enum";
import {UserTypeORM} from "./user.typeorm";

@ChildEntity(UserType.LAWYER)
@Unique('UQ_users_district', ['district.value'])
export class LawyerTypeORM extends UserTypeORM{

    @Column((type) => LawyerNameTypeORM, { prefix: false })
    public lawyerName: LawyerNameTypeORM;

    @Column((type) => LawyerLastNameTypeORM, { prefix: false })
    public lawyerLastName: LawyerLastNameTypeORM;

    @Column((type) => DistrictTypeORM, { prefix: false })
    public district: DistrictTypeORM;

    @Column((type) => UniversityTypeORM, { prefix: false })
    public university: UniversityTypeORM;

    @Column((type) => PriceLegalAdviceTypeORM, { prefix: false })
    public priceLegalAdvice: PriceLegalAdviceTypeORM;

    @Column((type) => PriceCustomContractTypeORM, { prefix: false })
    public priceCustomContract: PriceCustomContractTypeORM;
}