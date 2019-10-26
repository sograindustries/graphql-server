import { DynamoDB } from "aws-sdk";
import { createPatchModel } from "../db/models/patch";
import Knex = require("knex");
import { createUserModel } from "../db/models/user";

interface Config {}

interface Stores {
  ddb: DynamoDB.DocumentClient;
  db: Knex;
}

export const makeApi = (_: Config, stores: Stores) => {
  return {
    user: createUserModel(stores.db),
    patch: createPatchModel(stores.db)
  };
};

export type Api = ReturnType<typeof makeApi>;
