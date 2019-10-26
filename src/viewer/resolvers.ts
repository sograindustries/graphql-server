import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    viewer: (_, __, { auth }) => {
      if (!auth) {
        return null;
      }
      return {
        username: auth.username,
        id: auth.id
      };
    }
  }
};

export default resolvers;
