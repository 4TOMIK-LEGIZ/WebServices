import { Column } from "typeorm";

export class PriceLegalAdviceTypeORM {
    @Column('varchar', { name: 'price_legal_advice', nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): PriceLegalAdviceTypeORM {
        return new PriceLegalAdviceTypeORM(value);
    }
}