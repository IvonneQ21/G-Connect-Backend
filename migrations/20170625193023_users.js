
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.string('user_name').defaultTo('');
    table.integer('cohort_id').notNullable().references('id').inTable('cohorts').onDelete('CASCADE');
    table.string('email').unique().notNullable();
    table.specificType('hashed_password', 'char(60)').notNullable();
    table.string('photo_url', 'varchar(65)');
    table.integer('user_types_id').notNullable().references('id').inTable('user_types');
    table.timestamps(true, true);
  })
};
exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users');
};
