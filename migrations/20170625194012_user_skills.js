
exports.up = function(knex, Promise) {
  return knex.schema.createTable('user_skills', (table) => {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users');
    table.integer('skill_id').notNullable().references('id').inTable('skill_types');
    table.timestamps(true, true);
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('user_skills');
};
