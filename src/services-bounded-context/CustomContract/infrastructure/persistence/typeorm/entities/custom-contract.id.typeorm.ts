import {PrimaryGeneratedColumn} from "typeorm";

export class CustomContractIdTypeORM {
    @PrimaryGeneratedColumn('increment', {
        type: 'bigint',
        name: 'id',
        unsigned: true,
    })
    public value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): CustomContractIdTypeORM {
        return new CustomContractIdTypeORM(value);
    }
}