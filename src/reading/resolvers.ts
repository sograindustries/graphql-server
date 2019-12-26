import { Resolvers } from "../generated/graphql";

const resolvers: Resolvers = {
  User: {
    readings: (user, { startUnix }, { api }) => {
      if (!user.id) {
        return [];
      }

      return api.reading.listReadingsByTimeRange(
        user.id,
        startUnix ? new Date(startUnix * 1000) : undefined
      );
    }
  }
};

export default resolvers;
