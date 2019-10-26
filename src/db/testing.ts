import Knex = require("knex");
import * as path from "path";

export async function setup(db: Knex) {
  await db.migrate.latest({
    directory: path.resolve(__dirname, "migrations")
  });
}

export async function teardown(db: Knex) {
  await db.migrate.rollback({
    directory: path.resolve(__dirname, "migrations")
  });
}
