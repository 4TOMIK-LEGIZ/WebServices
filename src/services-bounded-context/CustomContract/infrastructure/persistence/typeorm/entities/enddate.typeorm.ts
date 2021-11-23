import {Column} from "typeorm";

export class EndDateTypeORM {
    @Column('varchar', {name: 'end_date',length: 100, nullable:false})
    public start_date: string;

    private constructor(end_date: string) {
        this.start_date=end_date;
    }

    public static from(end_date:string):EndDateTypeORM{
        return new EndDateTypeORM(end_date);
    }
}