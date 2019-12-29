import Knex = require("knex");
import { TABLE_NAME_PATCH_READING, TABLE_NAME_PATCH } from "../tables";
import { PatchReadingEntity } from "./patch";

export function createReadingModel(db: Knex) {
  return {
    listReadingsByTimeRange: async (userId: number, _: Date = new Date(0)) => {
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
        .limit(5)
        .orderBy("created_at", "desc");

      return readings;
    },

    create: async (input: {
      patchId: number;
      uri: string;
      firmwareVersion: string;
      sequence: number;
      uptimeMs: number;
    }) => {
      const [id] = await db
        .table<PatchReadingEntity>(TABLE_NAME_PATCH_READING)
        .insert({
          patch_id: input.patchId,
          uri: input.uri,
          firmware_version: input.firmwareVersion,
          sequence: input.sequence,
          uptime_ms: input.uptimeMs
        });

      return db
        .table<PatchReadingEntity>(TABLE_NAME_PATCH_READING)
        .select("*")
        .where("id", id)
        .first()
        .then(
          entry =>
            entry && {
              id: entry.id,
              uri: entry.uri,
              patchId: entry.patch_id,
              firmwareVersion: entry.firmware_version,
              sequence: input.sequence,
              uptimeMs: entry.uptime_ms,
              createdAt: entry.created_at
            }
        );
    }
  };
}
