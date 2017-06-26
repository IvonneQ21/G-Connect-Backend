exports.seed = function(knex, Promise) {
  return knex('cohort_members').del()
    .then(function () {
      return knex('cohort_members').insert([
        {id: 1, user_id: 1, cohort_id: 1},
        {id: 2, user_id: 2, cohort_id: 1},
        {id: 3, user_id: 3, cohort_id: 1}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('cohort_members_id_seq', (SELECT MAX(id) FROM cohort_members))");
    });
};
