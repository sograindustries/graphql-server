import * as Knex from "knex";
import { TABLE_NAME_USER } from "../tables";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLE_NAME_USER)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLE_NAME_USER).insert([
        { id: 1, username: "will@argosindustries.com" },
        { id: 2, username: "andy@argosindustries.com" }
      ]);
    });
}
