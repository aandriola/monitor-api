export async function up(knex) {
  await knex.schema.createTable('devices', (t) => {
    t.increments('id');
    t.string('name', 100).notNullable();
    t.string('host', 255).notNullable();
    t.string('type', 50).notNullable().defaultTo('generic');
    t.timestamp('last_heartbeat_at', { useTz: true }).nullable();
    t.timestamp('created_at', { useTz: true }).notNullable().defaultTo(knex.fn.now());
  });
}

export async function down(knex) {
  await knex.schema.dropTable('devices');
}
