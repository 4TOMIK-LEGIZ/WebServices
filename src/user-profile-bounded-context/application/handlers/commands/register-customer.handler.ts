import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {RegisterCustomer} from "../../commands/register-customer.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Result} from "typescript-result";
import {AppNotification} from "../../../../common/application/app.notification";
import {Password} from "../../../domain/value-objects/password.value";
import {Username} from "../../../domain/value-objects/username.value";
import {Email} from "../../../domain/value-objects/email.value";
import {Phone} from "../../../domain/value-objects/phone.value";
import {CustomerTypeORM} from "../../../infrastructure/persistence/typeorm/entities/customer.typeorm";
import {PersonName} from "../../../domain/value-objects/person-name.value";
import {Dni} from "../../../domain/value-objects/dni.value";
import {CustomerFactory} from "../../../domain/factories/customer.factory";
import {Customer} from "../../../domain/entities/customer.entity";
import {CustomerMapper} from "../../mappers/customer.mapper";
import {UserId} from "../../../domain/value-objects/user-id.value";

@CommandHandler(RegisterCustomer)
export class RegisterCustomerHandler implements ICommandHandler<RegisterCustomer> {
    constructor(
        @InjectRepository(CustomerTypeORM)
        private customerRepository: Repository<CustomerTypeORM>,
        private publisher: EventPublisher
    ) {}
    async execute(command: RegisterCustomer) {
        let customerId: number = 0;
        // Inheritance
        const usernameResult: Result<AppNotification, Username> = Username.create(command.username);
        if (usernameResult.isFailure()) {
            return customerId;
        }
        const passwordResult: Result<AppNotification, Password> = Password.create(command.password);
        if (passwordResult.isFailure()) {
            return customerId;
        }
        const emailResult: Result<AppNotification, Email> = Email.create(command.email);
        if (emailResult.isFailure()) {
            return customerId;
        }
        const phoneResult: Result<AppNotification, Phone> = Phone.create(command.phone);
        if (phoneResult.isFailure()) {
            return customerId;
        }
        // Customer
        const customerNameResult: Result<AppNotification, PersonName> = PersonName.create(command.firstName, command.lastName);
        if (customerNameResult.isFailure()) {
            return customerId;
        }
        const dniResult: Result<AppNotification, Dni> = Dni.create(command.dni);
        if (dniResult.isFailure()) {
            return customerId;
        }
        let customer: Customer = CustomerFactory.createFrom(
            usernameResult.value, passwordResult.value, emailResult.value, phoneResult.value,
            customerNameResult.value, dniResult.value);
        let customerTypeORM: CustomerTypeORM = CustomerMapper.toTypeORM(customer);
        customerTypeORM = await this.customerRepository.save(customerTypeORM);
        if (customerTypeORM == null) {
            return customerId;
        }
        customerId = Number(customerTypeORM.id);
        customer.changeId(UserId.of(customerId));
        customer = this.publisher.mergeObjectContext(customer);
        customer.register();
        customer.commit();
        return customerId;
    }
}