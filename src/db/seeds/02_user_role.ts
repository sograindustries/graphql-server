import * as Knex from "knex";
import { TABLE_NAME_USER_ROLE } from "../tables";

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return knex(TABLE_NAME_USER_ROLE)
    .del()
    .then(() => {
      // Inserts seed entries
      return knex(TABLE_NAME_USER_ROLE).insert([
        { id: 1, user_id: 1, role_id: 1 },
        { id: 2, user_id: 2, role_id: 1 }
      ]);
    });
}
