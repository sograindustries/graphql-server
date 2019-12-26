import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  Query: {
    user: async (_, args, { api }) => {
      let user = null;

      if (args.id) {
        user = await api.user.getUserById(args.id);
      } else if (args.username) {
        user = await api.user.getUserByUsername(args.username);
      }

      if (!user) {
        return null;
      }

      return {
        id: user.id,
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name
      };
    }
  }
};

export default resolvers;
