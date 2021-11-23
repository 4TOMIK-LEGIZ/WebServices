export class RegisterCustomerResponse {
    constructor(
        public id: number,
        public readonly username: string,
        public readonly password: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly dni: string
    ) {}
}