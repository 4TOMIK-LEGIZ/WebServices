import { Entity } from "src/common/domain/entities/entity";
import { Money } from "src/common/domain/value-objects/money.value";
import {CustomContractRegisteredEvent} from "../../messaging/contract-registered.event";

export class CustomContract extends Entity {
    private description: string;
    private lawyerid: number;
    private customerid: number;
    private start_date: string;
    private end_date: string;
    private cost: Money;
  
    public constructor(id: number, description: string,lawyerid: number, customerid: number, start_date: string, end_date,cost: Money) {
      super(id);
      this.description = description;
      this.lawyerid = lawyerid;
      this.customerid = customerid;
      this.start_date = start_date;
      this.end_date=end_date;
      this.cost = cost;
    }
  
    public register() {
      const event = new CustomContractRegisteredEvent (this.id, this.description,this.lawyerid, this.customerid, this.start_date,this.end_date,this.cost );
      this.apply(event);
    }

    
    public getdDescription(): string {
      return this.description;
    }
  
    public getlawyerid(): number {
      return this.lawyerid;
    }
  
    public getcustomerid(): number {
      return this.customerid;
    }

    public getstartdate():string {
      return this.start_date;
    }

    public getenddate():string {
        return this.end_date;
    }
    
    public getcost():Money {
      return this.cost;
    }    
      
    public changedescription(description: string): void {
      this.description = description;
    }
  
    public changelawyerid(lawyerid: number): void {
      this.lawyerid = lawyerid;
    }
  
    public changecustomerid(customerid: number): void {
      this.customerid = customerid;
    }

    public changecstartdate(coment: string) {
      this.start_date = coment;
    }

    public changecenddate(coment: string) {
        this.end_date = coment;
    }

    public changecost(cost: Money){
      this.cost = cost;
    }


  }