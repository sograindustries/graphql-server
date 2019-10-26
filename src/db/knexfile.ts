// Update with your config settings.

module.exports = {
  development: {
    client: "mysql2",
    connection: {
      filename: "./dev.sqlite3"
    }
  },

  staging: {
    client: "postgresql",
    connection: {
      database: "my_db",
      user: "username",
      password: "password"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  },

  production: {
    client: "mysql2",
    connection: {
      host: "database-1.comtzk4asbqy.us-east-1.rds.amazonaws.com",
      database: "sogra",
      user: "admin",
      password: "sograindustries"
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: "knex_migrations"
    }
  }
};
