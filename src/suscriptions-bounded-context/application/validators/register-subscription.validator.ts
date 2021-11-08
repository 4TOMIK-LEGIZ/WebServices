import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import {SubscriptionTypeORM} from "../../infrastructure/persistence/typeorm/entities/subscription.typeorm";
import {RegisterSubscriptionRequestDto} from "../dtos/request/register-subscription-request.dto";
import {AppNotification} from "../../shared/application/app.notification";

@Injectable()
export class RegisterSubscriptionValidator {
    constructor (
      @InjectRepository(SubscriptionTypeORM)
      private subscriptionRepository: Repository<SubscriptionTypeORM>,
    ) {}

    public async validate(
        registerSubscriptionRequestDto: RegisterSubscriptionRequestDto,
    ): Promise<AppNotification> {
        const notification: AppNotification = new AppNotification();
        const price: string = registerSubscriptionRequestDto.price.toString().trim();
        if ( price.length <= 0) {
            notification.addError('Subscription price is required', null);
        }
        const description: string = registerSubscriptionRequestDto.description.trim();
        if (description.length <= 0) {
            notification.addError( 'Subscription description is required', null);
        }
        if (notification.hasErrors()) {
            return notification;
        }
        const subscription: SubscriptionTypeORM = await this.subscriptionRepository
            .createQueryBuilder()
            .where('description = : description', { description })
            .getOne();
        if (subscription != null) {
            notification.addError('Subscription description is taken', null);
        }
        return notification;
    }

}