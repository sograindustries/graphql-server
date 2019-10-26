import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    user: (_, __, { auth }) => {
      if (!auth) {
        return null;
      }

      return {
        id: auth.id,
        username: auth.username
      };
    }
  }
};

export default resolvers;
