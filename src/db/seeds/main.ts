import * as Knex from "knex";
import {
  TABLE_NAME_USER,
  TABLE_NAME_PATCH,
  TABLE_NAME_PATCH_BATTERY,
  TABLE_NAME_USER_ROLE,
  TABLE_NAME_ROLE,
  TABLE_NAME_PATCH_ACTIVITY,
  TABLE_NAME_USER_PATCH_S3_DATA
} from "../tables";

const USER_WILL = {
  id: 1,
  username: "will@argosindustries.com",
  patches: [
    {
      id: 1,
      uuid: "1354309e-23a7-465c-b0f8-26ece5c578d0",
      batteryValues: [
        { id: 1, value: 1 },
        { id: 2, value: 0.5 },
        { id: 3, value: 0.2 }
      ]
    },
    {
      id: 2,
      uuid: "1354309e-23a7-465c-b0f8-26ece5c578d1",
      batteryValues: []
    }
  ]
};

export async function seed(knex: Knex): Promise<any> {
  // Deletes ALL existing entries
  return (
    knex(TABLE_NAME_PATCH_BATTERY)
      .del()
      .then(() => knex(TABLE_NAME_PATCH_BATTERY).del())
      .then(() => knex(TABLE_NAME_PATCH_ACTIVITY).del())
      .then(() => knex(TABLE_NAME_USER_PATCH_S3_DATA).del())
      .then(() => knex(TABLE_NAME_PATCH).del())
      .then(() => knex(TABLE_NAME_USER_ROLE).del())
      .then(() => knex(TABLE_NAME_ROLE).del())
      .then(() => knex(TABLE_NAME_USER).del())

      // User
      .then(() => {
        return knex(TABLE_NAME_USER).insert([
          { id: USER_WILL.id, username: USER_WILL.username }
        ]);
      })

      // Roles
      .then(() => {
        return knex(TABLE_NAME_ROLE).insert([
          { id: 1, name: "admin" },
          { id: 2, name: "patient" },
          { id: 3, name: "doctor" }
        ]);
      })

      // User role
      .then(() => {
        return knex(TABLE_NAME_USER_ROLE).insert([
          { user_id: USER_WILL.id, role_id: 1 }
        ]);
      })

      // Patches
      .then(() => {
        return knex(TABLE_NAME_PATCH).insert(
          USER_WILL.patches.map(patch => {
            return { id: patch.id, user_id: USER_WILL.id, uuid: patch.uuid };
          })
        );
      })

      // Battery
      .then(() => {
        return Promise.all(
          USER_WILL.patches.map(patch => {
            return knex(TABLE_NAME_PATCH_BATTERY).insert(
              patch.batteryValues.map(battery => {
                return { patch_id: patch.id, value: battery.value };
              })
            );
          })
        );
      })
  );
}
