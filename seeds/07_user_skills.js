
exports.seed = function(knex, Promise) {
  return knex('user_skills').del()
    .then(function () {
      return knex('user_skills').insert([
        {id: 1, user_id: 3, skill_id: 1},
        {id: 2, user_id: 3, skill_id: 2},
        {id: 3, user_id: 3, skill_id: 3},
        {id: 4, user_id: 3, skill_id: 4},
        {id: 5, user_id: 3, skill_id: 5},
        {id: 6, user_id: 3, skill_id: 6},
        {id: 7, user_id: 3, skill_id: 7},
        {id: 8, user_id: 3, skill_id: 8}
      ]);
    })
    .then(() => {
      return knex.raw("SELECT setval('user_skills_id_seq', (SELECT MAX(id) FROM user_skills))");
    })
};
