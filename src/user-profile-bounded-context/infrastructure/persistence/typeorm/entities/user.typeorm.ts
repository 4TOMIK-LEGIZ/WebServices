import {Column, Entity, PrimaryGeneratedColumn, TableInheritance} from "typeorm";
import {UsernameTypeORM} from "../value-objects/username.typeorm";
import {PasswordTypeORM} from "../value-objects/password.typeorm";
import {EmailTypeORM} from "../value-objects/email.typeorm";
import {PhoneTypeORM} from "../value-objects/phone.typeorm";
import {UserType} from "../../../../domain/enums/user-type.enum";

@Entity('users')
@TableInheritance({ column: 'type' })
export class UserTypeORM {
    @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
    public id: number;

    @Column({name:'type', type:'enum', enum: UserType, default: UserType.CUSTOMER})
    readonly type: UserType;

    @Column((type) => UsernameTypeORM, { prefix: false })
    public username: UsernameTypeORM;

    @Column((type) => PasswordTypeORM, { prefix: false })
    public password: PasswordTypeORM;

    @Column((type) => EmailTypeORM, { prefix: false })
    public email: EmailTypeORM;

    @Column((type) => PhoneTypeORM, { prefix: false })
    public phone: PhoneTypeORM;
}