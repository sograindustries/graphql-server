import knex = require("knex");

export const db = knex(
  require("./knexfile")[process.env.NODE_ENV || "development"]
);
