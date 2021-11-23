import { QualificationStatus } from "src/qualification-bounded-context/domain/enums/qualification.status";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('qualifications')
export class QualificationTypeORM {
    @PrimaryGeneratedColumn('increment', {type: 'bigint', name: 'id', unsigned: true})
    public id: number;

    @Column('tinyint', {name: 'status', width: 2, unsigned: true, nullable: false, })
    public status: QualificationStatus;
}