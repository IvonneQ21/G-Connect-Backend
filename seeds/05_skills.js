
exports.seed = function(knex, Promise) {
  return knex('skills').del()
    .then(function () {
      return knex('skills').insert([
        {id: 1, user_id: 1, skill_name: 'Javascript'},
        {id: 2, user_id: 2, skill_name: 'Supertest'},
        {id: 3, user_id: 3, skill_name: 'Mocha'},
        {id: 4, user_id: 3, skill_name: 'Swagger'},
        {id: 5, user_id: 3, skill_name: 'React'}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('skills_id_seq', (SELECT MAX(id) FROM skills))");
    });
};
