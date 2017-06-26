exports.up = function(knex, Promise) {
  return knex.schema.createTable('cohort_members', (table)=> {
    table.increments('id').primary();
    table.integer('user_id').notNullable().references('id').inTable('users').onDelete('CASCADE');
    table.integer('cohort_id').notNullable().references('id').inTable('cohorts').onDelete('CASCADE');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('cohort_members');
};
