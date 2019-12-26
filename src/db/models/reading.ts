import Knex = require("knex");
import { TABLE_NAME_PATCH_READING, TABLE_NAME_PATCH } from "../tables";
import { PatchReadingEntity } from "./patch";

export function createReadingModel(db: Knex) {
  return {
    listReadingsByTimeRange: async (userId: number, start: Date) => {
      const readings = await db
        .table<PatchReadingEntity>(TABLE_NAME_PATCH_READING)
        .innerJoin(
          TABLE_NAME_PATCH,
          `${TABLE_NAME_PATCH_READING}.patch_id`,
          "=",
          `${TABLE_NAME_PATCH}.id`
        )
        .select(`${TABLE_NAME_PATCH_READING}.*`)
        .where(`${TABLE_NAME_PATCH}.user_id`, userId)
        .orderBy("created_at", "desc");

      const selection = [];
      for (let i = 0; i < readings.length; i++) {
        const reading = readings[i];
        if (new Date(reading.created_at) >= start) {
          selection.push(reading);
        } else {
          selection.push(reading);
          break;
        }
      }

      return selection;
    }
  };
}
