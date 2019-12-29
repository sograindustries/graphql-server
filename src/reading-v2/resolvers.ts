import { Resolvers, CreateReadingInput2 } from "../generated/graphql";
import { UserInputError, ForbiddenError } from "apollo-server";
import { GraphQLError } from "graphql";

function validateInput(input?: CreateReadingInput2 | null) {
  if (!input) {
    throw new GraphQLError("Input is not defined.");
  }

  const { uri, firmwareVersion, sequence, uptimeMs } = input;

  if (!uri) {
    throw new Error("Blob `uri` must be defined.");
  }

  if (!firmwareVersion) {
    throw new Error("Blob `firmwareVersion` must be defined.");
  }

  if (!sequence) {
    throw new Error("Blob `sequence` must be defined.");
  }

  if (!uptimeMs) {
    throw new Error("Blob `uptimeMs` must be defined.");
  }

  return {
    ...input,
    uri,
    firmwareVersion,
    sequence,
    uptimeMs
  };
}

const resolvers: Resolvers = {
  Mutation: {
    createReading2: async (_, { input }, { auth, api }) => {
      if (!auth || auth.id) {
        throw new ForbiddenError("Forbidden.");
      }

      const validInput = validateInput(input);

      // If `patchId` was not provided, create patch using `patchBleId`.
      let patchId: number | null = null;
      if (!validInput.patchId) {
        if (!validInput.patchBleId) {
          throw new UserInputError(
            "Either `patchId` and `patchBleId` must be defined."
          );
        }

        const patch = await api.patch.create({
          user_id: auth.id,
          ble_id: validInput.patchBleId
        });

        if (!patch) {
          throw new GraphQLError(
            "Unable to create patch. Please try again later."
          );
        }
        patchId = patch.id;
      }

      if (!patchId) {
        throw new GraphQLError("Something wen't wrong creating a new patch.");
      }

      const reading = await api.reading.create({ ...validInput, patchId });

      if (!reading) {
        throw new GraphQLError(`Unable to create reading for patch ${patchId}`);
      }

      return { reading };
    }
  }
};

export default resolvers;
