import {CommandHandler, EventPublisher, ICommandHandler} from "@nestjs/cqrs";
import {RegisterLawyer} from "../../commands/register-lawyer.command";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Result} from "typescript-result";
import {AppNotification} from "../../../../common/application/app.notification";
import {Username} from "../../../domain/value-objects/username.value";
import {Lawyer} from "../../../domain/entities/lawyer.entity";
import {LawyerFactory} from "../../../domain/factories/lawyer.Factory";
import {Password} from "../../../domain/value-objects/password.value";
import {Phone} from "../../../domain/value-objects/phone.value";
import {Email} from "../../../domain/value-objects/email.value";
import {LawyerName} from "../../../domain/value-objects/lawyerName.value";
import {LawyerLastName} from "../../../domain/value-objects/lawyerLastName.value";
import {District} from "../../../domain/value-objects/district.value";
import {University} from "../../../domain/value-objects/university.value";
import {PriceLegalAdvice} from "../../../domain/value-objects/priceLegalAdvice.value";
import {PriceCustomContract} from "../../../domain/value-objects/priceCustomContract.value";
import {UserId} from "../../../domain/value-objects/user-id.value";
import {LawyerMapper} from "../../mappers/lawyer.mapper";
import {LawyerTypeORM} from "../../../infrastructure/persistence/typeorm/entities/lawyer.typeorm";

@CommandHandler(RegisterLawyer)
export class RegisterLawyerHandler implements ICommandHandler<RegisterLawyer> {
    constructor( @InjectRepository(LawyerTypeORM) private lawyerRepository: Repository<LawyerTypeORM>,
        private publisher: EventPublisher,
    ) {}
    async execute(command: RegisterLawyer) {
        let lawyerId:number = 0;
        // Inheritance
        const usernameResult: Result<AppNotification, Username> = Username.create(command.username);
        if (usernameResult.isFailure()) { return lawyerId; }
        const passwordResult: Result<AppNotification, Password> = Password.create(command.password);
        if (passwordResult.isFailure()) { return lawyerId; }
        const emailResult: Result<AppNotification, Email> = Email.create(command.email);
        if (emailResult.isFailure()) { return lawyerId; }
        const phoneResult: Result<AppNotification, Phone> = Phone.create(command.phone);
        if (phoneResult.isFailure()) { return lawyerId; }
        // Lawyer
        const lawyerNameResult: Result<AppNotification, LawyerName> = LawyerName.create(command.lawyerName);
        if (lawyerNameResult.isFailure()) {
            return lawyerId;
        }
        const lawyerLastNameResult: Result<AppNotification, LawyerLastName> = LawyerLastName.create(command.lawyerLastName);
        if (lawyerLastNameResult.isFailure()) {
            return lawyerId;
        }
        const districtResult: Result<AppNotification, District> = District.create(command.district);
        if (districtResult.isFailure()) {
            return lawyerId;
        }
        const universityResult: Result<AppNotification, University> = University.create(command.university);
        if (universityResult.isFailure()) {
            return lawyerId;
        }
        const priceLegalAdviceResult: Result<AppNotification, PriceLegalAdvice> = PriceLegalAdvice.create(command.priceLegalAdvice);
        if (priceLegalAdviceResult.isFailure()) { return lawyerId; }
        const priceCustomContractResult: Result<AppNotification, PriceCustomContract> = PriceCustomContract.create(command.priceCustomContract);
        if (priceCustomContractResult.isFailure()) { return lawyerId; }
        let lawyer: Lawyer = LawyerFactory.createFrom(
            usernameResult.value, passwordResult.value, emailResult.value, phoneResult.value, lawyerNameResult.value, lawyerLastNameResult.value,
            districtResult.value, universityResult.value, priceLegalAdviceResult.value, priceCustomContractResult.value
        );
        let lawyerTypeORM = LawyerMapper.toTypeORM(lawyer);
        lawyerTypeORM = await this.lawyerRepository.save(lawyerTypeORM);
        if (lawyerTypeORM == null) {
            return lawyerId;
        }
        lawyerId = Number(lawyerTypeORM.id);
        lawyer.changeId(UserId.of(lawyerId));
        lawyer = this.publisher.mergeObjectContext(lawyer);
        lawyer.register();
        lawyer.commit();
        return lawyerId;
    }
}
