import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {AppNotification} from "../../../common/application/app.notification";
import {RegisterLawyerRequest} from "../dtos/request/register-lawyer.request.dto";
import {LawyerTypeORM} from "../../infrastructure/persistence/typeorm/entities/lawyer.typeorm";
import {UserTypeORM} from "../../infrastructure/persistence/typeorm/entities/user.typeorm";

@Injectable()
export class RegisterLawyerValidator {
    constructor (
        @InjectRepository(LawyerTypeORM)
        private lawyerRepository: Repository<LawyerTypeORM>,
    ) {}

    public async validate(
        registerLawyerRequest: RegisterLawyerRequest,
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();

        const username: string = registerLawyerRequest.username.trim();
        if (username.length <= 0) {
            notification.addError('username is required', null);
        }

        const district: string = registerLawyerRequest.district.trim();
        if (district.length <= 0) {
            notification.addError('district is required', null);
        }

        if (notification.hasErrors()) {
            return notification;
        }

        const user: UserTypeORM = await this.lawyerRepository.createQueryBuilder().where("district = :district", { district }).getOne();
        if (user != null) {
            notification.addError('email is taken', null);
        }
        return notification;
    }
}