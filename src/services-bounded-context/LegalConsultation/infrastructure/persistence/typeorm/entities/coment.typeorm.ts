import {Column} from "typeorm";

export class ComentTypeORM {
    @Column('varchar', {name: 'coment',length: 100, nullable:false})
    public coment: string;

    private constructor(coment: string) {
        this.coment=coment;
    }

    public static from(coment:string):ComentTypeORM{
        return new ComentTypeORM(coment);
    }
}