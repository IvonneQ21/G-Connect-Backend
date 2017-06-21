
exports.seed = function(knex, Promise) {
  return knex('users_type').del()
    .then(function () {
      return knex('users_type').insert([
        {id: 1, user_type: 'admin'},
        {id: 2, user_type: 'instructor'},
        {id: 3, user_type: 'student'}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('users_type_id_seq', (SELECT MAX(id) FROM users_type))");
    });
};
