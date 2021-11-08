import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { SerchLawyerSchema } from "../infrastructure.layer";
import { SerchLawyerDto } from "./dtos";

@Injectable()
export class SerchLawyerValidator {
  constructor(
    @InjectRepository(SerchLawyerSchema)
    private SerchLawyerRepository: Repository<Customer>,
  ) {
  }

  public async validate(
    SerchLawyerRequestDto: SerchLawyerRequestDto,
  ): Promise<AppNotification> {
    let notification: AppNotification = new AppNotification();
    const SpecializationID: number = SerchLawyerRequestDto.SpecializationID.trim();
    if (SpecializationID.length <= 0) {
      notification.addError('A lawyer specialization is requierd', null);
    }
    const Rating: number = SerchLawyerRequestDto.Rating.trim();
    if (Rating.length < 0) {
      notification.addError('Rating can not be lower than 0', null);
    }
    const Zone: Zone = SerchLawyerRequestDto.Zone.trim();
    if (Zone.length <= 0) {
      notification.addError('Zone is required', null);
    }
    if (notification.hasErrors()) {
      return notification;
    }
    return notification;
  }
}