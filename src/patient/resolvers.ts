import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  User: {
    patients: async (_, __, { api }) => {
      const users = await api.user.listUsers();

      if (!users) {
        return [];
      }

      return users.map(user => ({
        ...user,
        firstName: user.first_name,
        lastName: user.last_name
      }));
    }
  }
};

export default resolvers;
