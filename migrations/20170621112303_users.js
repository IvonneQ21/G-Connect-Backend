
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('first_name').notNullable();
    table.string('last_name').notNullable();
    table.text('linkedIn_url').notNullable();
    table.text('gitHub_url').notNullable();
    table.text('twitter_url').notNullable();
    table.integer('user_type_id').notNullable().references('id').inTable('users_type');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.shema.dropTable('users');
};
