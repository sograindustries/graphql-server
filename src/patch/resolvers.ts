import { Resolvers } from "../generated/graphql";
import { UserInputError } from "apollo-server-core";

const resolvers: Resolvers = {
  User: {
    patches: async (user, __, { auth, api }) => {
      if (!auth || !user.id) {
        return [];
      }

      return api.patch.getPatchesByUserId(user.id);
    }
  },

  Mutation: {
    updatePatch: async (_, { input }, { api }) => {
      const selectedPatch = await api.patch.getById(input.id);
      if (!selectedPatch) {
        return null;
      }

      if (!input.uuid) {
        return { patch: selectedPatch };
      }

      return {
        patch: await api.patch.update(input.id, {
          ...selectedPatch,
          uuid: input.uuid ? input.uuid : selectedPatch.uuid
        })
      };
    },

    createPatch: async (_, { input }, { api }) => {
      if (!input.uuid || !input.userId) {
        throw new UserInputError("Patch UUID and User ID must be provided.");
      }

      return {
        patch: await api.patch.create({
          uuid: input.uuid,
          user_id: input.userId
        })
      };
    }
  }
};

export default resolvers;
