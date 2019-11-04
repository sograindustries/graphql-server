import * as Knex from "knex";
import { TABLE_NAME_PATCH, TABLE_NAME_USER } from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_PATCH, patches => {
    patches.increments("id");
    patches
      .string("ble_id")
      .unique()
      .notNullable();
    patches.timestamp("created_at").defaultTo(knex.fn.now());
    patches.timestamp("updated_at").defaultTo(knex.fn.now());

    patches
      .integer("user_id")
      .unsigned()
      .notNullable();
    patches
      .foreign("user_id")
      .references("id")
      .inTable(TABLE_NAME_USER);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_PATCH);
}
