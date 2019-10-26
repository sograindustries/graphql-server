import * as Knex from "knex";
import { TABLE_NAME_PATCH } from "../tables";

export async function seed(knex: Knex): Promise<any> {
  return knex(TABLE_NAME_PATCH)
    .del()
    .then(() => {
      return knex(TABLE_NAME_PATCH).insert([
        { id: 1, user_id: 1, uuid: "1354309e-23a7-465c-b0f8-26ece5c578d0" },
        { id: 2, user_id: 1, uuid: "1354309e-23a7-465c-b0f8-26ece5c578d1" },
        { id: 3, user_id: 2, uuid: "1354309e-23a7-465c-b0f8-26ece5c578d2" }
      ]);
    });
}
