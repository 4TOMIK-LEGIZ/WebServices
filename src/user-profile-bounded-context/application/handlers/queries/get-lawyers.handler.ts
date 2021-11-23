import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {getManager} from "typeorm";
import {GetLawyersDto} from "../../dtos/queries/get-lawyers.dto";
import {GetLawyersQuery} from "../../queries/get-lawyers.query";

@QueryHandler(GetLawyersQuery)
export class GetLawyersHandler implements IQueryHandler<GetLawyersQuery> {
    constructor() {}

    async execute(query: GetLawyersQuery) {
        const manager = getManager();
        const sql = `
        SELECT
          id,
          username as userName,
          password
        FROM 
          users
        WHERE
          type = 'L'
        ORDER BY
          userName;`;
        const ormLawyers = await manager.query(sql);
        if (ormLawyers.length <= 0) {
            return [];
        }
        const lawyers: GetLawyersDto[] = ormLawyers.map(function (
            ormLawyer,
        ) {
            const lawyerDto = new GetLawyersDto();
            lawyerDto.id = Number(ormLawyer.id);
            lawyerDto.username = ormLawyer.username;
            lawyerDto.password = ormLawyer.password;
            lawyerDto.email = ormLawyer.email;
            lawyerDto.phone = ormLawyer.phone;
            lawyerDto.lawyerName = ormLawyer.lawyerName;
            lawyerDto.lawyerLastName = ormLawyer.lawyerLastName;
            lawyerDto.district = ormLawyer.district;
            lawyerDto.university = ormLawyer.university;
            lawyerDto.priceLegalAdvice = ormLawyer.priceLegalAdvice;
            lawyerDto.priceCustomContract = ormLawyer.priceCustomContract;
            return lawyerDto;
        });
        return lawyers;
    }
}