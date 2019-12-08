// Update with your config settings.

export default {
  test: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3307,
      database: "sogra",
      user: "root",
      password: "root"
    }
  },

  local: {
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
  },

  development: {
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
  },
  /*

  development: {
    client: "mysql2",
    connection: {
      host: "127.0.0.1",
      port: 3307,
      database: "sogra",
      user: "root",
      password: "root"
    }
  },
  */

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
} as any;
