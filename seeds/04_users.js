
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, first_name: 'Ivonne', last_name: 'Terrero', linkedIn_url: 'https://www.linkedin.com/in/ivonneterrero/', gitHub_url: 'https://github.com/ivonneq21', twitter_url: '', user_type_id: 1},
        {id: 2, first_name: 'Robert', last_name: 'Murray', linkedIn_url: '', gitHub_url: '', twitter_url: '', user_type_id: 2},
        {id: 3, first_name: 'Michael', last_name: 'Martinez', linkedIn_url: '', gitHub_url: '', twitter_url: '', user_type_id: 3}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
