import { Column } from "typeorm";

export class TextDescriptionTypeORM {
    @Column('varchar', {
        name: 'text_description',
        nullable: false
    })
    public value: string;

    private constructor(value: string) {
        this.value = value;
    }

    public static from(value: string): TextDescriptionTypeORM {
        return new TextDescriptionTypeORM(value);
    }
}