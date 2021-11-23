import {Column} from "typeorm";

export class DescriptionTypeORM {
    @Column('varchar', {name: 'description',length: 100, nullable:false})
    public coment: string;

    private constructor(description: string) {
        this.coment=description;
    }

    public static from(description:string):DescriptionTypeORM{
        return new DescriptionTypeORM(description);
    }
}