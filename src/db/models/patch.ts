import Knex = require("knex");
import { Entity } from ".";
import {
  TABLE_NAME_PATCH,
  TABLE_NAME_USER,
  TABLE_NAME_PATCH_BATTERY,
  TABLE_NAME_USER_PATCH_S3_DATA
} from "../tables";
import { UserEntity } from "./user";

interface Patch {
  uuid: string;

  user_id: number;
}

interface PatchBattery {
  patch_id: number;
  value: number;
}

interface PatchEcgData {
  patch_id: number;
  s3_uri: string;
}

type PatchEntity = Entity<Patch>;
type PatchBatteryEntity = Entity<PatchBattery>;
type PatchEcgDataEntity = Entity<PatchEcgData>;

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
        .select("*");
    },

    insertEcgPayload: async (patchId: number, uri: string) => {
      const [id] = await db
        .table<PatchEcgDataEntity>(TABLE_NAME_USER_PATCH_S3_DATA)
        .insert({ patch_id: patchId, s3_uri: uri });

      return db
        .table<PatchEcgDataEntity>(TABLE_NAME_USER_PATCH_S3_DATA)
        .select("*")
        .where("id", id)
        .first();
    },

    listEcgPayload: async (patchId: number) => {
      return db
        .table<PatchEcgData>(TABLE_NAME_USER_PATCH_S3_DATA)
        .select("*")
        .where("patch_id", patchId);
    },

    insertBatteryValue: async (patchId: number, value: number) => {
      const [id] = await db
        .table<PatchBatteryEntity>(TABLE_NAME_PATCH_BATTERY)
        .insert({ patch_id: patchId, value });

      return db
        .table<PatchBatteryEntity>(TABLE_NAME_PATCH_BATTERY)
        .select("*")
        .where("id", id)
        .first();
    },
    listBatteryValue: (id: number) => {
      return db
        .table<PatchBatteryEntity>(TABLE_NAME_PATCH_BATTERY)
        .select("*")
        .where("patch_id", id);
    },
    getBatteryValue: (id: number) => {
      return db
        .table<PatchBatteryEntity>(TABLE_NAME_PATCH_BATTERY)
        .select("*")
        .where("patch_id", id)
        .orderBy("created_at", "desc")
        .first();
    }
  };
}
