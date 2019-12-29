import Knex = require("knex");
import { Entity } from ".";
import { TABLE_NAME_USER_BPM, TABLE_NAME_USER } from "../tables";
import { UserEntity } from "./user";

interface Bpm {
  user_id: number;
  value: number;
}
type BpmEntity = Entity<Bpm>;

export function createBpmModel(db: Knex) {
  return {
    create: async (userId: number, value: number) => {
      const [id] = await db.table<BpmEntity>(TABLE_NAME_USER_BPM).insert({
        user_id: userId,
        value
      });

      return db
        .table<BpmEntity>(TABLE_NAME_USER_BPM)
        .select("*")
        .where("id", id)
        .first();
    },

    list: (userId: number) => {
      return db
        .table<BpmEntity>(TABLE_NAME_USER_BPM)
        .join<UserEntity>(
          TABLE_NAME_USER_BPM,
          `${TABLE_NAME_USER_BPM}.user_id`,
          "=",
          `${TABLE_NAME_USER}.id`
        )
        .where(`${TABLE_NAME_USER}.id`, userId)
        .orderBy("created_at", "desc")
        .select("*");
    }
  };
}
