import {UserRegistered} from "./user-registered.event";

export class CustomerRegistered extends UserRegistered {
    constructor(
        public readonly id: number,
        public readonly username: string,
        public readonly password: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly dni: string,
    ) {
        super(id);
    }
}