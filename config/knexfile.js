// Update with your config settings.

module.exports = {
  development: {
    client: "pg",
    connection: "postgress://localhost/galvanize-connect_dev",
    migrations: {
      tableName: "knex_migrations"
    }
  },

  test: {
    client: "pg",
    connection: "postgress://localhost/galvanize-connect_test",
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: "knex_migrations"
    }
  }

};
