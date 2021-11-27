import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {getManager} from "typeorm";
import {GetCustomersDto} from "../../dtos/queries/get-customers.dto";
import {GetCustomersQuery} from "../../queries/get-customers.query";

@QueryHandler(GetCustomersQuery)
export class GetCustomersHandler implements IQueryHandler<GetCustomersQuery> {
    constructor() {}

    async execute(query: GetCustomersQuery) {
        const manager = getManager();
        const sql = `
    SELECT 
      id,
      username,
      password,
      email,
      phone,
      first_name as customerName,
      last_name as customerLastName,
      dni
    FROM 
      users
    WHERE
      type = 'C'
    ORDER BY
      first_name;`;
        const ormCustomers = await manager.query(sql);
        if (ormCustomers.length <= 0) {
            return [];
        }
        const customers: GetCustomersDto[] = ormCustomers.map(function (ormCustomer) {
            let customerDto = new GetCustomersDto();
            customerDto.id = Number(ormCustomer.id);
            customerDto.username = ormCustomer.username;
            customerDto.password = ormCustomer.password;
            customerDto.email = ormCustomer.email;
            customerDto.phone = ormCustomer.phone;
            customerDto.firstName = ormCustomer.firstName;
            customerDto.lastName = ormCustomer.lastName;
            customerDto.dni = ormCustomer.dni;
            return customerDto;
        });
        return customers;
    }
}