import { Money } from "src/common/domain/value-objects/money.value";
import { LegalConsultation } from "src/services-bounded-context/LegalConsultation/domain/entities/legalConsultation.entity";
import {EntitySchema} from "typeorm";


export const legalConsultationSchema = new EntitySchema({
    name: 'legalConsultation',
    target: LegalConsultation,
    tableName: 'Consultation',
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: true,
        unsigned: true,
      },
      document: {
        name: 'document',
        type: String,
        length: 10,
      },
      lawyerid: {
        name: 'lawyer_id',
        type: 'bigint',
      },
      customerid: {
        name: 'customer_id',
        type: 'bigint',
      },
      coment: {
        name: 'coment',
        type: String,
        length: 100,
      },
      cost: {
        name: 'cost',
        type: 'varchar',
        length: 10,
      },
    },
    uniques: [
      {},
    ],
  });