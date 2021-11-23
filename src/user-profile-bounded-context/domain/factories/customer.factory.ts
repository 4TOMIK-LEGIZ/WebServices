import {Username} from "../value-objects/username.value";
import {Password} from "../value-objects/password.value";
import {Email} from "../value-objects/email.value";
import {Phone} from "../value-objects/phone.value";
import {Customer} from "../entities/customer.entity";
import {PersonName} from "../value-objects/person-name.value";
import {Dni} from "../value-objects/dni.value";

export class CustomerFactory {
    public static createFrom(username: Username, password: Password, email: Email, phone: Phone, name: PersonName, dni: Dni): Customer {
        return new Customer(username, password, email, phone, name, dni);
    }
}