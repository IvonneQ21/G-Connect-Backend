exports.up = function(knex, Promise) {
  return knex.schema.createTable('skill_types', (table) => {
    table.increments('id').primary();
    table.string('skill_name').notNullable();
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('skill_types');
};
