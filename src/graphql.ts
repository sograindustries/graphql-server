import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { Context } from "./context";
import { makeApi } from "./api";
import { DynamoDB } from "aws-sdk";

const ddb =
  process.env.NODE_ENV === "production"
    ? new DynamoDB.DocumentClient()
    : new DynamoDB.DocumentClient({
        region: "localhost",
        endpoint: "http://localhost:8000"
      });

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: req => {
    const auth = extractAuthFromEvent(req.event);

    return {
      api: makeApi({}, { ddb }),
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
