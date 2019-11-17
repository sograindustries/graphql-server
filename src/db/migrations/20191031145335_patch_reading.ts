import * as Knex from "knex";
import { TABLE_NAME_PATCH, TABLE_NAME_PATCH_READING } from "../tables";

export async function up(knex: Knex): Promise<any> {
  return knex.schema.createTable(TABLE_NAME_PATCH_READING, table => {
    table.increments("id");
    table.string("uri").notNullable();
    table.string("firmware_version");
    table.integer("uptime_ms");
    table.integer("sequence");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());

    table
      .integer("patch_id")
      .unsigned()
      .notNullable();
    table
      .foreign("patch_id")
      .references("id")
      .inTable(TABLE_NAME_PATCH);
  });
}

export async function down(knex: Knex): Promise<any> {
  return knex.schema.dropTable(TABLE_NAME_PATCH_READING);
}
