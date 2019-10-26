import Knex = require("knex");
import { Entity } from ".";
import { TABLE_NAME_PATCH, TABLE_NAME_USER } from "../tables";
import { UserEntity } from "./user";

interface Patch {
  uuid: string;

  user_id: number;
}

export type PatchEntity = Entity<Patch>;

export function createPatchModel(db: Knex) {
  return {
    create: async (patch: Patch) => {
      const [id] = await db.table<PatchEntity>(TABLE_NAME_PATCH).insert(patch);

      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .select("*")
        .where("id", id)
        .first();
    },
    update: async (id: number, patch: Patch) => {
      await db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .where("id", id)
        .update(patch);

      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .select("*")
        .where("id", id)
        .first();
    },
    getById: (id: number) => {
      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .select("*")
        .where("id", id)
        .first();
    },
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
