import {UsernameTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/username.typeorm";
import {PasswordTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/password.typeorm";
import {EmailTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/email.typeorm";
import {PhoneTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/phone.typeorm";
import {Customer} from "../../domain/entities/customer.entity";
import {CustomerTypeORM} from "../../infrastructure/persistence/typeorm/entities/customer.typeorm";
import {DniTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/dni.typeorm";
import {PersonNameTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/person-name.typeorm";

export class CustomerMapper {
    public static toTypeORM(customer: Customer): CustomerTypeORM {
        const customerTypeORM: CustomerTypeORM = new CustomerTypeORM();
        customerTypeORM.username = UsernameTypeORM.from(customer.getUsername().getValue());
        customerTypeORM.password = PasswordTypeORM.from(customer.getPassword().getValue());
        customerTypeORM.email = EmailTypeORM.from(customer.getEmail().getValue());
        customerTypeORM.phone = PhoneTypeORM.from(customer.getPhone().getValue());
        customerTypeORM.name = PersonNameTypeORM.from(customer.getName().getFirstName(), customer.getName().getLastName());
        customerTypeORM.dni = DniTypeORM.from(customer.getDni().getValue());
        return customerTypeORM;
    }
}