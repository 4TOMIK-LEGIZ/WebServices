import {PrimaryGeneratedColumn} from "typeorm";


export class CustomContractIdTypeorm {
    @PrimaryGeneratedColumn('increment', { type: 'bigint', name: 'id', unsigned: true })
    public value: number;

    private constructor(value: number) {
        this.value = value;
    }

    public static from(value: number): CustomContractIdTypeorm  {
        return new CustomContractIdTypeorm(value);
    }
}