export class RegisterLawyerResponse {
    constructor(
        public id: number,
        public readonly username: string,
        public readonly password: string,
        public readonly email: string,
        public readonly phone: string,
        public readonly lawyerName: string,
        public readonly lawyerLastName: string,
        public readonly district: string,
        public readonly university: string,
        public readonly priceLegalAdvice: string,
        public readonly priceCustomContract: string
    ) {}
}