import { EntitySchema } from 'typeorm';

export const SerchLawyerSchema = new EntitySchema({
  name: 'SerchLawyer',
  target: SerchLawyer,
  tableName: 'filters',
  columns: {
    id: {
      type: 'bigint',
      primary: true,
      generated: true,
      unsigned: true,
    },
    SpecializationID: {
      name: 'specialization_id',
      type: String,
      length: 75,
    },
    Ratimg: {
      name: 'rating,
      type: String,
      length: 5,
    },
    Zone: {
      type: Zone,
      length: 30,
    },
  },
  uniques: [
    {
    },
  ],
});