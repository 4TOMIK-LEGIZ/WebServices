import {Column} from "typeorm";

export class UniversityTypeORM {
    @Column('varchar', { name: 'university', nullable: true })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): UniversityTypeORM {
        return new UniversityTypeORM(value);
    }
}