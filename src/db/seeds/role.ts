import * as Knex from "knex";
import { TABLE_NAME_ROLE } from "../tables";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLE_NAME_ROLE)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLE_NAME_ROLE).insert([
        { id: 1, name: "admin" },
        { id: 2, name: "patient" },
        { id: 3, name: "doctor" }
      ]);
    });
}
