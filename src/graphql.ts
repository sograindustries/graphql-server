import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { Context } from "./context";
import { makeApi } from "./api";
import { db } from "./db";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
  context: async req => {
    const auth = extractAuthFromEvent(req.event);

    const api = makeApi({}, { db });

    const user = auth ? await api.user.getUserByUsername(auth.username) : null;
    const userId = user ? user.id : null;

    return {
      api,
      auth: { ...auth, id: userId }
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
