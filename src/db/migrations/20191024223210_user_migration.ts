import * as Knex from "knex";
import { TABLE_NAME_USER } from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_USER, users => {
    users.increments("id").notNullable();
    users
      .string("username")
      .unique()
      .notNullable();
    users.timestamp("created_at").defaultTo(knex.fn.now());
    users.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_USER);
}
