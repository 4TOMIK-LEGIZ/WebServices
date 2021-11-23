import { Column } from "typeorm";

export class LawyerNameTypeORM {
    @Column('varchar', { name: 'lawyer_name', nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): LawyerNameTypeORM {
        return new LawyerNameTypeORM(value);
    }
}