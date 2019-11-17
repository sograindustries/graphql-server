import * as Knex from "knex";
import {
  TABLE_NAME_PATCH_READING,
  TABLE_NAME_PATCH_READING_TAG
} from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_PATCH_READING_TAG, table => {
    table.increments("id");
    table.string("value").notNullable();
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .integer("reading_id")
      .unsigned()
      .notNullable();
    table
      .foreign("reading_id")
      .references("id")
      .inTable(TABLE_NAME_PATCH_READING);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_PATCH_READING_TAG);
}
