import {Column} from "typeorm";

export class LawyerLastNameTypeORM {
    @Column('varchar', { name: 'lawyer_last_name', nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): LawyerLastNameTypeORM {
        return new LawyerLastNameTypeORM(value);
    }
}