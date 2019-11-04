import { createPatchModel } from "../db/models/patch";
import Knex = require("knex");
import { createUserModel } from "../db/models/user";

interface Config {}

interface Stores {
  db: Knex;
}

export const makeApi = (_: Config, stores: Stores) => {
  return {
    user: createUserModel(stores.db),
    patch: createPatchModel(stores.db)
  };
};

export type Api = ReturnType<typeof makeApi>;
