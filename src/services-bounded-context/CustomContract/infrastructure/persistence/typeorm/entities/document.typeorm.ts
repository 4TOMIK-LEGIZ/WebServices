import {Column} from "typeorm";

export class DocumentTypeORM {
    @Column('varchar', {name: 'document',length: 100, nullable:false})
    public document: string;

    private constructor(document: string) {
        this.document=document;
    }

    public static from(document:string):DocumentTypeORM{
        return new DocumentTypeORM(document);
    }
}