import { Entity } from "src/common/domain/entities/entity";
import { Money } from "src/common/domain/value-objects/money.value";
import { legalConsultationRegisteredEvent } from "../../messaging/consultation-registered.event";

export class LegalConsultation extends Entity {
    private document: Document;
    private lawyerid: number;
    private customerid: number;
    private coment: string;
    private cost: Money;
  
    public constructor(id: number, document: Document,lawyerid: number, customerid: number, coment: string, cost: Money) {
      super(id);
      this.document = document;
      this.lawyerid = lawyerid;
      this.customerid = customerid;
      this.coment = coment;
      this.cost = cost;
    }
  
    public register() {
      const event = new legalConsultationRegisteredEvent (this.id, this.document,this.lawyerid, this.customerid, this.coment,this.cost );
      this.apply(event);
    }

    
    public getdocument(): Document {
      return this.document;
    }
  
    public getlawyerid(): number {
      return this.lawyerid;
    }
  
    public getcustomerid(): number {
      return this.customerid;
    }

    public getcoment():string {
      return this.coment;
    }
    
    public getcost():Money {
      return this.cost;
    }    
      
    public changedocument(document: Document): void {
      this.document = document;
    }
  
    public changelawyerid(lawyerid: number): void {
      this.lawyerid = lawyerid;
    }
  
    public changecustomerid(customerid: number): void {
      this.customerid = customerid;
    }

    public changecoment(coment: string) {
      this.coment = coment;
    }

    public changecost(cost: Money){
      this.cost = cost;
    }


  }