import knex = require("knex");
import "./knexfile";
const knexfile = require("./knexfile");

export const db = knex(knexfile[process.env.NODE_ENV || "development"]);
