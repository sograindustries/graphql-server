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
  firstName: "Will",
  lastName: "Brazil",
  patches: [
    {
      id: 1,
      ble_id: "1354309e-23a7-465c-b0f8-26ece5c578d0",
      batteryValues: [
        { id: 1, value: 1 },
        { id: 2, value: 0.5 },
        { id: 3, value: 0.2 }
      ],
      readings: [{ uri: "test-uri" }, { uri: "test-uri2" }]
    },
    {
      id: 2,
      ble_id: "1354309e-23a7-465c-b0f8-26ece5c578d1",
      batteryValues: [],
      readings: [{ uri: "test-uri" }]
    }
  ]
};
const USER_ANDY = {
  id: 2
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
          {
            id: USER_WILL.id,
            username: USER_WILL.username,
            first_name: USER_WILL.firstName,
            last_name: USER_WILL.lastName
          },
          {
            id: USER_ANDY.id,
            username: "andrew@argosindustries.com",
            first_name: "Andrew",
            last_name: "Casper"
          }
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
          { user_id: USER_WILL.id, role_id: 1 },
          { user_id: USER_ANDY.id, role_id: 1 }
        ]);
      })

      // Patches
      .then(() => {
        return knex(TABLE_NAME_PATCH).insert(
          USER_WILL.patches.map(patch => {
            return {
              id: patch.id,
              user_id: USER_WILL.id,
              ble_id: patch.ble_id
            };
          })
        );
      })
    /*

    
      // Battery
      .then(() => {
        return Promise.all(
          USER_WILL.patches.map(patch => {
            return knex(TABLE_NAME_PATCH_BATTERY).insert(
              patch.batteryValues.map((battery, i) => {
                return {
                  created_at: new Date(
                    new Date().setDate(new Date().getDate() - (1 - i))
                  ),
                  patch_id: patch.id,
                  value: battery.value
                };
              })
            );
          })
        );
      })

      // Readings
      .then(() => {
        return Promise.all(
          USER_WILL.patches.map(patch => {
            return knex(TABLE_NAME_PATCH_READING).insert(
              patch.readings.map((reading, i) => {
                return {
                  created_at: new Date(
                    new Date().setDate(new Date().getDate() - (1 - i))
                  ),
                  patch_id: patch.id,
                  uri: reading.uri
                };
              })
            );
          })
        );
      })
      */
  );
}
