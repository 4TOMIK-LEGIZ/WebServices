import {Column} from "typeorm";

export class LawCommentTypeORM {
    @Column('varchar', {name: 'law_comment',length: 100, nullable:false})
    public coment: string;

    private constructor(comment: string) {
        this.coment=comment;
    }

    public static from(comment:string):LawCommentTypeORM{
        return new LawCommentTypeORM(comment);
    }
}