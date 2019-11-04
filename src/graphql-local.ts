import { ApolloServer } from "apollo-server";
import typeDefs from "./schema.graphql";
import resolvers from "./resolvers";
import { Context } from "./context";
import { makeApi } from "./api";
import { db } from "./db";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  context: async context => {
    const auth = extractAuthFromHeaders(context.req.headers);

    const api = makeApi({}, { db });

    const user = auth ? await api.user.getUserByUsername(auth.username) : null;
    const userId = user ? user.id : null;

    return {
      api,
      auth: { ...auth, id: userId }
    } as Context;
  }
});

function extractAuthFromHeaders(headers?: any) {
  return {
    username: headers["username"] || "will@argosindustries.com"
  };
}

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
