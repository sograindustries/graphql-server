import knex = require("knex");

export const db = knex(require("./knexfile")["production"]);
