import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  User: {
    readings: (user, _, { api }) => {
      console.log("HELLO,", user);
      if (!user.id) {
        return [];
      }

      return api.reading.listReadingsByTimeRange(user.id, new Date(0));
    }
  }
};

export default resolvers;
