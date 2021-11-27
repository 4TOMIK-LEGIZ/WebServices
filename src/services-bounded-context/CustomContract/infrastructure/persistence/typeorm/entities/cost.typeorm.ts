import {Column} from "typeorm";

export class CostTypeORM {
    @Column('varchar', {
        name: 'cost',
        nullable: false
    })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): CostTypeORM {
        return new CostTypeORM(value);
    }
}