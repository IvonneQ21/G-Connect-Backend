exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_types', (table) => {
    table.increments('id').primary();
    table.string('user_type').notNullable();
    table.timestamps(true, true);
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_types');
};
