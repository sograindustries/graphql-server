import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { Context } from "./context";
import { makeApi } from "./api";
import { DynamoDB } from "aws-sdk";
import { db } from "./db";

const isTest = process.env.JEST_WORKER_ID;
const config = {
  convertEmptyValues: true,
  ...(isTest && {
    endpoint: "localhost:8000",
    sslEnabled: false,
    region: "local-env"
  })
};

const ddb = new DynamoDB.DocumentClient(config);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => {
    const auth = extractAuthFromEvent(req.event);

    return {
      api: makeApi({}, { ddb, db }),
      auth
    } as Context;
  }
});

function extractAuthFromEvent(event?: any) {
  if (!event) {
    return null;
  }

  const requestContext = event["requestContext"];
  if (!requestContext) {
    return null;
  }

  const authorizer = requestContext["authorizer"];
  if (!authorizer) {
    return null;
  }

  const claims = authorizer["claims"];
  if (!claims) {
    return null;
  }

  const username = claims["cognito:username"];
  const jwt = event.headers["Authorization"];

  if (!username || !jwt) {
    return null;
  }

  return { username, jwt };
}

export const graphqlHandler = server.createHandler({
  cors: {
    origin: true,
    credentials: true
  }
});
