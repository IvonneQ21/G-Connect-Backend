
exports.up = function(knex, Promise){
  return knex.schema.createTable('cohorts', (table) => {
    table.increments('id').primary();
    table.string('name', 'varchar(6)').notNullable();
    table.date('graduation_date').notNullable();
    table.integer('campus_id').notNullable().references('id').inTable('campuses').onDelete('CASCADE');
    table.timestamps(true, true);
  })
};

exports.down = function(knex, Promise){
  return knex.schema.dropTable('cohorts');
};
