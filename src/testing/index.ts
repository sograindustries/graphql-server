import { ApolloServer } from "apollo-server-lambda";
import typeDefs from "../schema.graphql";
import resolvers from "../resolvers";
import { Context } from "../context";
import { Api } from "../api";

export type MockApi = Partial<{ [k in keyof Api]: Partial<Api[k]> }>;

export const createMockServer = (
  partialContext: Partial<Context>,
  partialApi: MockApi
) =>
  new ApolloServer({
    typeDefs,
    resolvers,
    context: () => {
      return {
        ...partialContext,
        api: partialApi as any
      } as Context;
    }
  });
