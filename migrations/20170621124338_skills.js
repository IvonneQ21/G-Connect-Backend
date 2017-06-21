exports.up = function(knex, Promise) {
  return knex.schema.createTable('skills', (table) => {
    table.increments('id').primary();
    table.integer('user_id').references('id').inTable('users');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('skills');
};