import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {getManager} from "typeorm";
import {GetSubscriptionsDto} from "../../dtos/queries/get-subscriptions.dto";
import {GetSubscriptionsQuery} from "../../queries/get-subscriptions.query";

@QueryHandler(GetSubscriptionsQuery)
export class GetSubscriptionsHandler
    implements IQueryHandler<GetSubscriptionsQuery> {
    constructor() {}

    async execute(query: GetSubscriptionsQuery) {
        const manager = getManager();
        const sql = `
        SELECT 
            id,
            price,
            description,
        FROM 
            subscriptions
        ORDER BY
            price;`;
        const ormSubscriptions = await manager.query(sql);
        if (ormSubscriptions.length <= 0) {
            return [];
        }
        const subscriptions: GetSubscriptionsDto[] = ormSubscriptions.map(function (
            ormSubscription
        ) {
            const subscriptionDto = new GetSubscriptionsDto();
            subscriptionDto.id = Number(ormSubscription.id);
            subscriptionDto.price = ormSubscription.price;
            subscriptionDto.description = ormSubscription.description;
            return subscriptionDto;
        });
        return subscriptions;
    }

}