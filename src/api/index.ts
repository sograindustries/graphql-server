import { makeService as makePatchService } from "./patch";
import { DynamoDB } from "aws-sdk";
import { makeService as makeUserService } from "./user";

interface Config {}

interface Stores {
  ddb: DynamoDB.DocumentClient;
}

export const makeApi = (_: Config, stores: Stores) => {
  return {
    patch: makePatchService(stores.ddb),
    user: makeUserService(stores.ddb)
  };
};

export type Api = ReturnType<typeof makeApi>;
