import {ChildEntity, Column, Unique} from "typeorm";
import {UserType} from "../../../../domain/enums/user-type.enum";
import {UserTypeORM} from "./user.typeorm";
import {DniTypeORM} from "../value-objects/dni.typeorm";
import {PersonNameTypeORM} from "../value-objects/person-name.typeorm";

@ChildEntity(UserType.CUSTOMER)
@Unique('UQ_users_dni', ['dni.value'])
export class CustomerTypeORM extends UserTypeORM {
    @Column((type) => PersonNameTypeORM, { prefix: false })
    public name: PersonNameTypeORM;

    @Column((type) => DniTypeORM, { prefix: false })
    public dni: DniTypeORM;
}