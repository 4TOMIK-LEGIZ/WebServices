import {Column} from "typeorm";

export class PriceTypeORM {
    @Column('bigint', { name: 'price', nullable: false})
    value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): PriceTypeORM {
        return new PriceTypeORM(value);
    }
}