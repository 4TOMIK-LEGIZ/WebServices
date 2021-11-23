import { Money } from "src/common/domain/value-objects/money.value";
import { CustomContract } from "../entities/customContract.entity";

export class CustomContractFactory {
    public static createFrom(description: string,lawyerid: number, customerid: number, start_date: string, end_date:string,cost: Money): CustomContract {
      return new CustomContract(0, description, lawyerid, customerid, start_date,end_date, cost);
    }
  
    public static withId(id: number, description: string,lawyerid: number, customerid: number, start_date: string, end_date:string,cost: Money): CustomContract {
      return new CustomContract(id, description, lawyerid, customerid, start_date,end_date, cost);
    }
  }