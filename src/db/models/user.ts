import { Entity } from ".";
import Knex = require("knex");
import { TABLE_NAME_USER, TABLE_NAME_PATCH } from "../tables";
import { PatchEntity } from "./patch";

interface User {
  username: string;
}

export type UserEntity = Entity<User>;

export function createUserModel(db: Knex) {
  return {
    getPatchesByUserId: (userId: number) => {
      return db
        .table<UserEntity>(TABLE_NAME_USER)
        .join<PatchEntity>(
          TABLE_NAME_PATCH,
          `${TABLE_NAME_USER}.id`,
          "=",
          `${TABLE_NAME_PATCH}.user_id`
        )
        .where(`${TABLE_NAME_USER}.id`, userId)
        .select("uuid")
        .then(rows => {
          return rows.map(row => {
            return {
              uuid: row.uuid
            };
          });
        });
    }
  };
}
