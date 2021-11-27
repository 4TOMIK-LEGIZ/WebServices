import {AggregateRoot} from "@nestjs/cqrs";
import e from "express";
import {UserId} from "../value-objects/user-id.value";
import {Password} from "../value-objects/password.value";
import {Email} from "../value-objects/email.value";
import {Username} from "../value-objects/username.value";
import {Phone} from "../value-objects/phone.value";
import {UserType} from "../enums/user-type.enum";
import {type} from "os";

export abstract class User extends AggregateRoot{
    protected id: UserId;
    protected type: UserType;
    protected username: Username;
    protected password: Password;
    protected email: Email;
    protected phone: Phone;

    public constructor(type: UserType, username: Username, password: Password, email: Email, phone: Phone) {
        super();
        this.type = type;
        this.username = username;
        this.password = password;
        this.email = email;
        this.phone = phone;
    }

    public getId(): UserId {
        return this.id;
    }

    public getUsername(): Username {
        return this.username;
    }

    public getPassword(): Password {
        return this.password;
    }

    public getEmail(): Email{
        return this.email;
    }

    public getPhone(): Phone {
        return this.phone;
    }

    public changeId(id: UserId) {
        this.id = id;
    }

    public changeUsername(username: Username) {
        this.username = username;
    }

    public changeEmail(email: Email) {
        this.email = email;
    }

    public changePhone(phone: Phone) {
        this.phone = phone;
    }
}