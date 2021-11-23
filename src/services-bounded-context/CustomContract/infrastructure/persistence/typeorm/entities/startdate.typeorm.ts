import {Column} from "typeorm";

export class StartDateTypeORM {
    @Column('varchar', {name: 'start_date',length: 100, nullable:false})
    public start_date: string;

    private constructor(start_date: string) {
        this.start_date=start_date;
    }

    public static from(start_date:string):StartDateTypeORM{
        return new StartDateTypeORM(start_date);
    }
}