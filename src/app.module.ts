import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import { SubscriptionsModule } from "./suscriptions-bounded-context/subscriptionsModule";
import { UsersModule } from "./user-profile-bounded-context/usersModule";

@Module({
  imports: [SubscriptionsModule, UsersModule, TypeOrmModule.forRoot()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
