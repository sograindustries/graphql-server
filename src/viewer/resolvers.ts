import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    viewer: async (_, __, { auth, api }) => {
      if (!auth) {
        return null;
      }

      const user = await api.user.getUserById(auth.id);

      if (!user) {
        return {};
      }

      return {
        id: auth.id,
        username: auth.username,
        firstName: user.first_name,
        lastName: user.last_name
      };
    }
  }
};

export default resolvers;
