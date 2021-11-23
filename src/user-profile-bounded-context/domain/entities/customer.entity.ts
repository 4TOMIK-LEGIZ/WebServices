import {User} from "./user.entity";
import {UserType} from "../enums/user-type.enum";
import {Username} from "../value-objects/username.value";
import {Password} from "../value-objects/password.value";
import {Email} from "../value-objects/email.value";
import {Phone} from "../value-objects/phone.value";
import {UserId} from "../value-objects/user-id.value";
import {CustomerRegistered} from "../events/customer-registered.event";
import {PersonName} from "../value-objects/person-name.value";
import {Dni} from "../value-objects/dni.value";

export class Customer extends User {
    private name: PersonName;
    private dni: Dni;

    public constructor(username: Username, password: Password, email: Email, phone: Phone, name: PersonName, dni: Dni) {
        super(UserType.CUSTOMER,username, password, email, phone);
        this.name = name;
        this.dni = dni;
    }

    public register() {
        const event = new CustomerRegistered(
            this.id.getValue(),
            this.username.getValue(),
            this.password.getValue(),
            this.email.getValue(),
            this.phone.getValue(),
            this.name.getFirstName(),
            this.name.getLastName(),
            this.dni.getValue()
        );
        this.apply(event);
    }


    getId(): UserId {
        return this.id;
    }

    getUsername(): Username {
        return this.username;
    }

    getPassword(): Password {
        return this.password;
    }

    getPhone(): Phone {
        return this.phone;
    }
    public getName(): PersonName {
        return this.name;
    }

    public getDni(): Dni {
        return this.dni;
    }
}