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

const ROLES = {
  ADMIN: {
    id: 1,
    name: "admin"
  },
  USER: {
    id: 2,
    name: "user"
  }
};

const USER_WILL = {
  id: 1,
  username: "will@argosindustries.com",
  firstName: "Will",
  lastName: "Guedes",
  roles: [ROLES.ADMIN, ROLES.USER],
  patches: [
    {
      id: 1,
      bleId: "will-ble-1",
      readings: []
    },
    {
      id: 2,
      bleId: "will-ble-2",
      readings: []
    }
  ]
};

const USER_ANDY: typeof USER_WILL = {
  id: 2,
  username: "andy@argosindustries.com",
  firstName: "Andrew",
  lastName: "Casper",
  roles: [ROLES.ADMIN, ROLES.USER],
  patches: [
    {
      id: 100,
      bleId: "andy-ble-1",
      readings: []
    }
  ]
};

const USERS = [USER_WILL, USER_ANDY];

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

      // Roles
      .then(() => {
        return knex(TABLE_NAME_ROLE).insert([ROLES.ADMIN, ROLES.USER]);
      })

      // User
      .then(() =>
        knex(TABLE_NAME_USER).insert(
          USERS.map(user => ({
            id: user.id,
            username: user.username,
            first_name: user.firstName,
            last_name: user.lastName
          }))
        )
      )

      // User role
      .then(() => {
        return knex(TABLE_NAME_USER_ROLE).insert(
          USERS.map(user =>
            user.roles.map(role => ({
              role_id: role.id,
              user_id: user.id
            }))
          ).reduce((a, b) => [...a, ...b], [])
        );
      })

      // Patches
      .then(() => {
        return knex(TABLE_NAME_PATCH).insert(
          USERS.map(user =>
            user.patches.map(patch => ({
              id: patch.id,
              ble_id: patch.bleId,
              user_id: user.id
            }))
          ).reduce((a, b) => [...a, ...b], [])
        );
      })
  );
}
