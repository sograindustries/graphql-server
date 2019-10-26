import { Entity } from ".";
import Knex = require("knex");
import { TABLE_NAME_USER } from "../tables";

interface User {
  username: string;
}

export type UserEntity = Entity<User>;

export function createUserModel(db: Knex) {
  return {
    create: async (user: User) => {
      const [id] = await db.table<UserEntity>(TABLE_NAME_USER).insert(user);

      return db
        .table<UserEntity>(TABLE_NAME_USER)
        .select("*")
        .where("id", id)
        .first();
    },
    getUserByUsername: (username: string) => {
      return db
        .table<UserEntity>(TABLE_NAME_USER)
        .where("username", username)
        .select("*")
        .first();
    },
    getUserById: (id: number) => {
      return db
        .table<UserEntity>(TABLE_NAME_USER)
        .where("id", id)
        .select("*")
        .first();
    }
  };
}
