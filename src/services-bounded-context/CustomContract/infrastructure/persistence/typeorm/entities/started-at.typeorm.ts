import {Column} from "typeorm";

export class StartedAtTypeORM {
    @Column('varchar', {name: 'started_at',length: 100, nullable:false})
    public start_date: string;

    private constructor(start_date: string) {
        this.start_date=start_date;
    }

    public static from(start_date:string):StartedAtTypeORM{
        return new StartedAtTypeORM(start_date);
    }
}