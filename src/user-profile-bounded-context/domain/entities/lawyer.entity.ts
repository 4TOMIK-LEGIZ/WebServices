import {User} from "./user.entity";
import {LawyerName} from "../value-objects/lawyerName.value";
import {Phone} from "../value-objects/phone.value";
import {Password} from "../value-objects/password.value";
import {Email} from "../value-objects/email.value";
import {Username} from "../value-objects/username.value";
import {UserId} from "../value-objects/user-id.value";
import {LawyerLastName} from "../value-objects/lawyerLastName.value";
import {District} from "../value-objects/district.value";
import {University} from "../value-objects/university.value";
import {PriceLegalAdvice} from "../value-objects/priceLegalAdvice.value";
import {PriceCustomContract} from "../value-objects/priceCustomContract.value";
import {LawyerRegistered} from "../events/lawyer-registered.event";
import {UserType} from "../enums/user-type.enum";

export class Lawyer extends User {
    private lawyerName: LawyerName;
    private lawyerLastName: LawyerLastName;
    private district: District;
    private university: University;
    private priceLegalAdvice: PriceLegalAdvice;
    private priceCustomContract: PriceCustomContract;


    public constructor(username: Username, password: Password, email: Email, phone: Phone, lawyerName: LawyerName,
                lawyerLastName: LawyerLastName, district: District, university: University, priceLegalAdvice: PriceLegalAdvice,
                priceCustomContract: PriceCustomContract) {
        super(UserType.LAWYER, username, password, email, phone);
        this.lawyerName = lawyerName;
        this.lawyerLastName = lawyerLastName;
        this.district = district;
        this.university = university;
        this.priceLegalAdvice = priceLegalAdvice;
        this.priceCustomContract = priceCustomContract;
    }

    public register() {
        const event = new LawyerRegistered(
            this.id.getValue(),
            this.username.getValue(),
            this.password.getValue(),
            this.email.getValue(),
            this.phone.getValue(),
            this.lawyerName.getValue(),
            this.lawyerLastName.getValue(),
            this.district.getValue(),
            this.university.getValue(),
            this.priceLegalAdvice.getValue(),
            this.priceCustomContract.getValue()
        );
        this.apply(event);
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

    public getEmail(): Email {
        return this.email;
    }

    public getPhone(): Phone {
        return this.phone;
    }

    public getLawyerName(): LawyerName {
        return this.lawyerName;
    }

    public getLawyerLastName(): LawyerLastName {
        return this.lawyerLastName;
    }

    public getDistrict(): District {
        return this.district;
    }

    public getUniversity(): University {
        return this.university;
    }

    public getPriceLegalAdvice(): PriceLegalAdvice {
        return this.priceLegalAdvice;
    }

    public getPriceCustomContract(): PriceCustomContract {
        return this.priceCustomContract;
    }

    public changeLawyerName(lawyerName: LawyerName){
        this.lawyerName = lawyerName;
    }

    public changeLawyerLastName(lawyerLastName: LawyerLastName){
        this.lawyerLastName = lawyerLastName;
    }

    public changeDistrict(district: District){
        this.district = district;
    }

    public changeUniversity(university: University) {
        this.university = university;
    }

    public changePriceLegalAdvice(priceLegalAdvice: PriceLegalAdvice) {
        this.priceLegalAdvice = priceLegalAdvice;
    }

    public changePriceCustomContract(priceCustomContract: PriceCustomContract) {
        this.priceCustomContract = priceCustomContract;
    }
}