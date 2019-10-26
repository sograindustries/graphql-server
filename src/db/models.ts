import Knex = require("knex");
import { db } from ".";

const TABLE_NAME_USERS = "users";
const TABLE_NAME_PATCH = "patches";

type Entity<T> = T & {
  id: number;
  created_at: string;
  updated_at: string;
  deleted_at?: string;
};

interface Patch {
  uuid: string;

  user_id: number;
}

interface User {
  username: string;
}

type PatchEntity = Entity<Patch>;
type UserEntity = Entity<User>;

export function createPatchModel(db: Knex) {
  return {
    create: async (patch: Patch) => {
      return db.table<PatchEntity>(TABLE_NAME_PATCH).insert(patch);
    },
    update: async (id: number, patch: Patch) => {
      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .where("id", id)
        .update(patch);
    },
    getById: (id: number) => {
      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .select("*")
        .where("id", id)
        .first();
    }
  };
}

export function createUserModel(db: Knex) {
  return {
    getPatches: (userId: number) => {
      return db
        .table<UserEntity>(TABLE_NAME_USERS)
        .join<PatchEntity>(TABLE_NAME_PATCH, "users.id", "=", "patches.user_id")
        .where("users.id", userId)
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

const model = createUserModel(db);

(async () => {
  const patches = await model.getPatches(1234);
  if (patches) {
    patches.map(p => p.uuid);
  }
})();
