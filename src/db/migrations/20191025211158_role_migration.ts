import * as Knex from "knex";
import { TABLE_NAME_ROLE } from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_ROLE, table => {
    table.increments("id");
    table.string("name").notNullable();
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_ROLE);
}
