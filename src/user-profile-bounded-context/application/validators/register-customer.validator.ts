import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AppNotification} from "../../../common/application/app.notification";
import {RegisterCustomerRequest} from "../dtos/request/register-customer.request.dto";
import {CustomerTypeORM} from "../../infrastructure/persistence/typeorm/entities/customer.typeorm";

@Injectable()
export class RegisterCustomerValidator {
    constructor(
        @InjectRepository(CustomerTypeORM)
        private customerRepository: Repository<CustomerTypeORM>,
    ) {}
    public async validate(
        registerCustomerRequest: RegisterCustomerRequest,
    ): Promise<AppNotification> {
        let notification: AppNotification = new AppNotification();
        const customerName: string = registerCustomerRequest.firstName ? registerCustomerRequest.firstName.trim() : '';
        if (customerName.length <= 0) {
            notification.addError('firstName is required', null);
        }
        const lastName: string = registerCustomerRequest.lastName ? registerCustomerRequest.lastName.trim() : '';
        if (lastName.length <= 0) {
            notification.addError('lastName is required', null);
        }
        const dni: string = registerCustomerRequest.dni ? registerCustomerRequest.dni.trim() : '';
        if (dni.length <= 0) {
            notification.addError('dni is required', null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        const customer: CustomerTypeORM = await this.customerRepository.createQueryBuilder().where("dni = :dni", { dni }).getOne();
        if (customer != null) {
            notification.addError('dni is taken', null);
        }
        return notification;
    }
}