import {Column} from "typeorm";

export class LawDocumentTypeORM {
    @Column('varchar', {name: 'law_document',length: 100, nullable:false})
    public document: string;

    private constructor(document: string) {
        this.document=document;
    }

    public static from(document:string): LawDocumentTypeORM{
        return new LawDocumentTypeORM(document);
    }
}