import { DynamoDB } from "aws-sdk";

interface Patch {
  id: number; // same as uuid.
  uuid: string;
  batteryPct?: number;
  userId?: number;
}

function makeCreateFn(ddb: DynamoDB.DocumentClient) {
  return async function create(patch: Patch) {
    console.log("HEE!");
    await ddb.put(
      {
        TableName: "local-table",
        Item: {
          id: `patch-${patch.id}`,
          ...patch
        }
      },
      (err, data) => {
        if (err) {
          console.log("ERROR: ", err);
        }

        if (data) {
          console.log("DATA: ", data);
        } else {
          console.log("NADA");
        }
      }
    );
  };
}

async function get(uuid: string) {
  console.log(uuid);
}

async function update() {}

async function remove() {}

async function search(userId?: string) {
  console.log(userId);
}

export const makeService = (ddb: DynamoDB.DocumentClient) => {
  return {
    create: makeCreateFn(ddb),
    update,
    remove,
    get,
    search
  };
};
