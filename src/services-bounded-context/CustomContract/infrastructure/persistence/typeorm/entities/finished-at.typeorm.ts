import {Column} from "typeorm";

export class FinishedAtTypeORM {
    @Column('varchar', {
        name: 'finished_at',
        nullable: false
    })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): FinishedAtTypeORM {
        return new FinishedAtTypeORM(value);
    }
}