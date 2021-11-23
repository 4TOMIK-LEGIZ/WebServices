import {Lawyer} from "../../domain/entities/lawyer.entity";
import {LawyerTypeORM} from "../../infrastructure/persistence/typeorm/entities/lawyer.typeorm";
import {UsernameTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/username.typeorm";
import {PasswordTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/password.typeorm";
import {EmailTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/email.typeorm";
import {PhoneTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/phone.typeorm";
import {LawyerNameTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/lawyer-name.typeorm";
import {LawyerLastNameTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/lawyer-last-name.typeorm";
import {DistrictTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/district.typeorm";
import {UniversityTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/university.typeorm";
import {PriceLegalAdviceTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/price-legal-advice.typeorm";
import {PriceCustomContractTypeORM} from "../../infrastructure/persistence/typeorm/value-objects/price-custom-contract.typeorm";

export class LawyerMapper {
    public static toTypeORM(lawyer: Lawyer): LawyerTypeORM {
        const lawyerTypeORM: LawyerTypeORM = new LawyerTypeORM();
        lawyerTypeORM.username = UsernameTypeORM.from(lawyer.getUsername().getValue());
        lawyerTypeORM.password = PasswordTypeORM.from(lawyer.getPassword().getValue());
        lawyerTypeORM.email = EmailTypeORM.from(lawyer.getEmail().getValue());
        lawyerTypeORM.phone = PhoneTypeORM.from(lawyer.getPhone().getValue());
        lawyerTypeORM.lawyerName = LawyerNameTypeORM.from(lawyer.getLawyerName().getValue());
        lawyerTypeORM.lawyerLastName = LawyerLastNameTypeORM.from(lawyer.getLawyerLastName().getValue());
        lawyerTypeORM.district = DistrictTypeORM.from(lawyer.getDistrict().getValue());
        lawyerTypeORM.university = UniversityTypeORM.from(lawyer.getUniversity().getValue());
        lawyerTypeORM.priceLegalAdvice = PriceLegalAdviceTypeORM.from(lawyer.getPriceLegalAdvice().getValue());
        lawyerTypeORM.priceCustomContract = PriceCustomContractTypeORM.from(lawyer.getPriceCustomContract().getValue());
        return lawyerTypeORM;
    }
}