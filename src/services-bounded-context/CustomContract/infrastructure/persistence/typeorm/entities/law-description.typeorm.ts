import {Column} from "typeorm";

export class LawDescriptionTypeORM {
    @Column('varchar', {name: 'law_description',length: 100, nullable:false})
    public coment: string;

    private constructor(description: string) {
        this.coment=description;
    }

    public static from(description:string):LawDescriptionTypeORM{
        return new LawDescriptionTypeORM(description);
    }
}