import { EntitySchema } from "typeorm";

export const ServiceQualificationSchema = new EntitySchema ( {
    name: 'ServiceQualification',
    target: ServiceQualification,
    tableName: 'Qualification',
    columns: {
        id: {
            type: 'bigint',
            primary: true,
            generated: true,
            unsigned: true,
        },
        feedback: {
            name: 'feedback',
            type: String,
            length: 150,
        },
        lawyerid: {
            name: 'lawyer_id',
            type: 'bigint'
        },
        customerid: {
            name: 'customer_id',
            type: 'bigint',
        },
        qualification: {
            name: 'qualification',
            type: Number,
        },
        qDate: {
            name: 'q_Date',
            type: Date,
            length: 9,
        },
    },
    uniques: [
        {},
    ],
});