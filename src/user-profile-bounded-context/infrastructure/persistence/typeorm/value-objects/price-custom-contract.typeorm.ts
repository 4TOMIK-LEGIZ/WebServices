import {Column} from "typeorm";

export class PriceCustomContractTypeORM {
    @Column('varchar', { name: 'price_custom_contract', nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): PriceCustomContractTypeORM {
        return new PriceCustomContractTypeORM(value);
    }
}