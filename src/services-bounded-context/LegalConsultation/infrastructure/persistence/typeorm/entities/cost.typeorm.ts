import {Column} from "typeorm";

export class CostTypeORM {
    @Column('varchar', {name: 'cost',length: 50, nullable:false})
    public cost: string;

    private constructor(cost: string) {
        this.cost=cost;
    }

    public static from(cost:string):CostTypeORM{
        return new CostTypeORM(cost);
    }
}