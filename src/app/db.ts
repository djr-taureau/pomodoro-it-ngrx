import { DBSchema } from '@ngrx/db';

export const schema: DBSchema = {
  version: 1,
  name: 'tasks_app',
  stores: {
    tasks: {
      autoIncrement: true,
      primaryKey: 'id',
    },
    pomos: {
      autoIncrement: true,
      primaryKey: 'id',
    },
  },
};
