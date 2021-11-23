import {Column} from "typeorm";

export class DistrictTypeORM {
    @Column('varchar', { name: 'district', length: 8, nullable: false })
    value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): DistrictTypeORM {
        return new DistrictTypeORM(value);
    }
}