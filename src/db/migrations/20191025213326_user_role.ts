import * as Knex from "knex";
import {
  TABLE_NAME_USER_ROLE,
  TABLE_NAME_USER,
  TABLE_NAME_ROLE
} from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_USER_ROLE, table => {
    table.increments("id");

    table
      .integer("user_id")
      .unsigned()
      .notNullable();
    table
      .foreign("user_id")
      .references("id")
      .inTable(TABLE_NAME_USER);

    table
      .integer("role_id")
      .unsigned()
      .notNullable();
    table
      .foreign("role_id")
      .references("id")
      .inTable(TABLE_NAME_ROLE);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_USER_ROLE);
}
