import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  User: {
    patches: async (user, __, { auth, api }) => {
      if (!auth || !user.id) {
        return [];
      }

      return api.patch.getPatchesByUserId(user.id);
    }
  }
};

export default resolvers;
