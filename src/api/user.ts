import { DynamoDB } from "aws-sdk";
import { indexId } from "./helpers";

const INDEX_PREFIX = "users";

interface User {
  id: string;
  username: string;
  email?: string;
}

function makeCreateFn(tableName: string, ddb: DynamoDB.DocumentClient) {
  return function create(user: User) {
    return new Promise((res, rej) => {
      ddb.put(
        {
          TableName: tableName,
          Item: {
            id: indexId(INDEX_PREFIX, user.id),
            user
          }
        },
        (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          if (!data || !data.Attributes) {
            rej(new Error("Something wen't wrong while creating a user."));
            return;
          }

          res(data.Attributes["user"]);
        }
      );
    });
  };
}

function makeGetFn(tableName: string, ddb: DynamoDB.DocumentClient) {
  return function get(id: string) {
    return new Promise<User | null>((res, rej) => {
      ddb.get(
        {
          TableName: tableName,
          Key: {
            id: indexId(INDEX_PREFIX, id)
          }
        },
        (err, data) => {
          if (err) {
            rej(err);
            return;
          }

          if (!data) {
            rej(new Error("Something wen't wrong while creating a user."));
            return;
          }

          if (data.Item) {
            res({ ...data.Item, id } as User);
          } else {
            res(null);
          }
        }
      );
    });
  };
}

async function update() {}

async function remove() {}

async function search(userId?: string) {
  console.log(userId);
}

export const makeService = (ddb: DynamoDB.DocumentClient) => {
  const defaultTableName = process.env.APP_TABLE || "local-table";
  return {
    create: makeCreateFn(defaultTableName, ddb),
    update,
    remove,
    get: makeGetFn(defaultTableName, ddb),
    search
  };
};
