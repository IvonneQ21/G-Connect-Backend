
exports.seed = function(knex, Promise) {
  return knex('skill_types').del()
    .then(function () {
      return knex('skill_types').insert([
        {id: 1, skill_name: 'Javascript'},
        {id: 2, skill_name: 'Supertest'},
        {id: 3, skill_name: 'Mocha'},
        {id: 4, skill_name: 'Swagger'},
        {id: 5, skill_name: 'React'},
        {id: 6, skill_name: 'Express'},
        {id: 7, skill_name: 'Node'},
        {id: 8, skill_name: 'Redux'}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('skill_types_id_seq', (SELECT MAX(id) FROM skill_types))");
    });
};
