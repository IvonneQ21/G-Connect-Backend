exports.seed = function(knex, Promise) {
  return knex('user_types').del()
    .then(function () {
      return knex('user_types').insert([
        {id: 1, user_type: 'admin'},
        {id: 2, user_type: 'instructor'},
        {id: 3, user_type: 'student'}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('user_types_id_seq', (SELECT MAX(id) FROM user_types))");
    });
};
