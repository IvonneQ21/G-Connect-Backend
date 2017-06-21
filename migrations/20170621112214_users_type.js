
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users_type', (table) => {
    table.increments('id').primary();
    table.string('user_type').notNullable();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users_type');
};
