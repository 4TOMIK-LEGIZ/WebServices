import {EntitySchema} from "typeorm";
import {CustomContract} from "../../../domain/entities/customContract.entity";


export const customContractSchema = new EntitySchema({
    name: 'customContractSchema',
    target: CustomContract,
    tableName: 'Contract',
    columns: {
      id: {
        type: 'bigint',
        primary: true,
        generated: true,
        unsigned: true,
      },
      description: {
        name: 'description',
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
      start_date: {
        name: 'start_date',
        type: String,
        length: 100,
      },
      end_date: {
        name: 'end_date',
        type: String,
        length: 100,
      },
      cost: {
        name: 'cost',
        type: 'money',
        length: 10,
      },
    },
    uniques: [
      {},
    ],
  });