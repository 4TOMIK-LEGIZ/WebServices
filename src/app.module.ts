import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SubscriptionsModule } from "./subscriptions-bounded-context/subscriptionsModule";
import { UsersModule } from "./user-profile-bounded-context/usersModule";
import {QualificationModule} from "./qualification-bounded-context/qualification.module";
import {LegalConsultationModule} from "./services-bounded-context/LegalConsultation/legalConsultation.module";
import {CustomContractModule} from "./services-bounded-context/CustomContract/customContract.module";

@Module({
  imports: [SubscriptionsModule, UsersModule,
    QualificationModule, LegalConsultationModule, CustomContractModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
