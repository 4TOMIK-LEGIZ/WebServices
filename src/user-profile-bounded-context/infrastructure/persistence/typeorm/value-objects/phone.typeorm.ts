import {Column} from "typeorm";

export class PhoneTypeORM {
    @Column('varchar', { name: 'phone', length: 9, nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): PhoneTypeORM {
        return new PhoneTypeORM(value);
    }
}