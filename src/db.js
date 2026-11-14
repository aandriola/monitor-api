import knex from 'knex';

export function createDb(connection) {
  return knex({ client: 'pg', connection });
}
