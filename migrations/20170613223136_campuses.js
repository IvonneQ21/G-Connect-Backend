
exports.up = function(knex, Promise) {
  return knex.schema.createTable('campuses', (table) =>{
    table.increments('id').primary();
    table.string('campus_name').notNullable().unique();
    table.string('campus_city').notNullable().unique();
    table.string('campus_state').notNullable().unique();
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('campuses');
};
