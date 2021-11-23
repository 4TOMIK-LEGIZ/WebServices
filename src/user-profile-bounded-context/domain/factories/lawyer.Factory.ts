import { Lawyer } from "../entities/lawyer.entity";
import { Username } from "../value-objects/username.value";
import { Password } from "../value-objects/password.value";
import { Email } from "../value-objects/email.value";
import { Phone } from "../value-objects/phone.value";
import {District} from "../value-objects/district.value";
import {LawyerLastName} from "../value-objects/lawyerLastName.value";
import {University} from "../value-objects/university.value";
import {LawyerName} from "../value-objects/lawyerName.value";
import {PriceLegalAdvice} from "../value-objects/priceLegalAdvice.value";
import {PriceCustomContract} from "../value-objects/priceCustomContract.value";

export class LawyerFactory{
    public static createFrom(username: Username, password: Password, email: Email, phone: Phone, lawyerName: LawyerName,
                             lawyerLastName: LawyerLastName, district: District, university: University,
                             priceLegalAdvice: PriceLegalAdvice, priceCustomContract: PriceCustomContract): Lawyer {
        return new Lawyer(username, password, email, phone, lawyerName, lawyerLastName,
            district, university, priceLegalAdvice, priceCustomContract);
    }
}