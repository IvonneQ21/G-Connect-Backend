
exports.seed = function(knex, Promise) {
  return knex('cohorts').del()
    .then(function () {
      return knex('cohorts').insert([
        {id: 1, name: 'g42', graduation_date:'2017-06-23', campus_id: 7},
        {id: 2, name: 'g52', graduation_date:'2017-09-29', campus_id: 7}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('cohorts_id_seq', (SELECT MAX(id) FROM cohorts))");
    });
};
