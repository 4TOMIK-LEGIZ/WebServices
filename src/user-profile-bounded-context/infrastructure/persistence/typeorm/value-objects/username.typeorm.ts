import {Column} from "typeorm";

export class UsernameTypeORM {
    @Column('varchar', { name: 'username', nullable: false })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): UsernameTypeORM {
        return new UsernameTypeORM(value);
    }
}