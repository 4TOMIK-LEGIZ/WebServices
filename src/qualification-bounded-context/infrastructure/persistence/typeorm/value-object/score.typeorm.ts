import { Column } from "typeorm";

export class ScoreTypeORM {
    @Column('varchar', {
        name: 'score',
        nullable: false
    })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): ScoreTypeORM {
        return new ScoreTypeORM(value);
    }
}