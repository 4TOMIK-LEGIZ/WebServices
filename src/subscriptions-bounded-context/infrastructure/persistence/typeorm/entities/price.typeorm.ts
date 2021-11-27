import {Column} from "typeorm";

export class PriceTypeORM {
    @Column('varchar', {
        name: 'price',
        nullable: false
    })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): PriceTypeORM {
        return new PriceTypeORM(value);
    }
}