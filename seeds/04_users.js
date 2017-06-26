
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, first_name: 'Ivonne', last_name: 'Terrero', user_name: 'IvonneQ21', cohort_id: 1, email: 'iqcodes21@gmail.com', hashed_password: '', photo_url:'', user_types_id: 1},
        {id: 2, first_name: 'Robert', last_name: 'Murray',  user_name: '', cohort_id: 1, email: 'robert.murray@galvanize.com', hashed_password: '', photo_url:'', user_types_id: 2},
        {id: 3, first_name: 'Michael', last_name: 'Martinez', user_name: '', cohort_id: 1, email: 'martinez1212@gmail.com', hashed_password: '', photo_url:'', user_types_id: 3}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
