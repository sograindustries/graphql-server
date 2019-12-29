import { Resolvers } from "../generated/graphql";
import { UserInputError } from "apollo-server";

const resolvers: Resolvers = {
  User: {
    bpm: (user, _, { api }) => {
      if (!user.id) {
        return null;
      }

      return api.bpm.list(user.id);
    }
  },

  Mutation: {
    createBpm: (_, args, { api }) => {
      const { userId, value } = args.input;
      if (!userId || !value) {
        throw new UserInputError("User ID and BPM Value must be provided.");
      }

      return api.bpm.create(userId, value).then(bpm => bpm || null);
    }
  }
};

export default resolvers;
