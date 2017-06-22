
exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {id: 1, first_name: 'Ivonne', last_name: 'Terrero', user_name: '', email: 'iqcodes21@gmail.com', hashed_password: '', linkedIn_url: 'https://www.linkedin.com/in/ivonneterrero/', gitHub_url: 'https://github.com/ivonneq21', twitter_url: '', user_type_id: 1},
        {id: 2, first_name: 'Robert', last_name: 'Murray',  user_name: '', email: 'robert.murray@galvanize.com', hashed_password: '', linkedIn_url: '', gitHub_url: '', twitter_url: '', user_type_id: 2},
        {id: 3, first_name: 'Michael', last_name: 'Martinez', user_name: '', email: 'martinez1212@gmail.com', hashed_password: '', linkedIn_url: '', gitHub_url: '', twitter_url: '', user_type_id: 3}
      ]);
    })
    .then(() => {
        return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users))");
    });
};
