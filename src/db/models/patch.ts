import Knex = require("knex");
import { Entity } from ".";
import {
  TABLE_NAME_PATCH,
  TABLE_NAME_USER,
  TABLE_NAME_PATCH_BATTERY,
  TABLE_NAME_USER_PATCH_S3_DATA,
  TABLE_NAME_PATCH_READING,
  TABLE_NAME_PATCH_READING_TAG
} from "../tables";
import { UserEntity } from "./user";

interface Patch {
  ble_id?: string;
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

interface PatchReading {
  patch_id: number;
  uri: string;
  firmware_version: string;
  uptime_ms: number;
  sequence: number;
}

interface PatchReadingTag {
  reading_id: number;
  value: string;
}

type PatchEntity = Entity<Patch>;
type PatchBatteryEntity = Entity<PatchBattery>;
type PatchEcgDataEntity = Entity<PatchEcgData>;
export type PatchReadingEntity = Entity<PatchReading>;
type PatchReadingTagEntity = Entity<PatchReadingTag>;

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

    getByBleId: (id: string) => {
      return db
        .table<PatchEntity>(TABLE_NAME_PATCH)
        .select("*")
        .where("ble_id", id)
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
    },

    listReadings: async (patchId: number) => {
      return db
        .table<PatchReadingEntity>(TABLE_NAME_PATCH_READING)
        .select("*")
        .where("patch_id", patchId)
        .then(arr => {
          return arr.map(el => ({
            ...el,
            createdAt: el.created_at
          }));
        });
    },

    listReadingsByTimeRange: async (patchId: number, start: Date) => {
      const readings = await db
        .table<PatchReadingEntity>(TABLE_NAME_PATCH_READING)
        .select("*")
        .where("patch_id", patchId)
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
    },

    insertReading: async (input: {
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
        .first();
    },

    createReadingTags: (readingId: number, tags: string[]) =>
      createReadingTags(db, readingId, tags),

    getReadingTags: (readingId: number) => getReadingTags(db, readingId)
  };
}

async function createReadingTags(db: Knex, readingId: number, tags: string[]) {
  const ids = await Promise.all(
    tags.map(tag => {
      return db
        .table<PatchReadingTagEntity>(TABLE_NAME_PATCH_READING_TAG)
        .insert({
          reading_id: readingId,
          value: tag
        })
        .then(result => result[0]);
    })
  );

  return db
    .table<PatchReadingTagEntity>(TABLE_NAME_PATCH_READING_TAG)
    .select("*")
    .where("id", "IN", ids);
}

async function getReadingTags(db: Knex, readingId: number) {
  return db
    .table<PatchReadingTagEntity>(TABLE_NAME_PATCH_READING_TAG)
    .select("*")
    .where("reading_id", readingId);
}
