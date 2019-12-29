import { createPatchModel } from "../db/models/patch";
import Knex = require("knex");
import { createUserModel } from "../db/models/user";
import { createReadingModel } from "../db/models/reading";
import { createBpmModel } from "../db/models/bpm";

interface Config {}

interface Stores {
  db: Knex;
}

export const makeApi = (_: Config, stores: Stores) => {
  return {
    user: createUserModel(stores.db),
    patch: createPatchModel(stores.db),
    reading: createReadingModel(stores.db),
    bpm: createBpmModel(stores.db)
  };
};

export type Api = ReturnType<typeof makeApi>;
