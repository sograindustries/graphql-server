import { Resolvers } from "../generated/graphql";
import { UserInputError, AuthenticationError } from "apollo-server-core";

const resolvers: Resolvers = {
  User: {
    patches: async (user, __, { auth, api }) => {
      if (!auth || !user.id) {
        return [];
      }

      const patches = await api.patch.getPatchesByUserId(user.id);
      return patches.map(patch => ({
        ...patch,
        bleId: patch.ble_id
      }));
    },

    patch: async (user, { id }, { auth, api }) => {
      if (!auth || !user.id) {
        return null;
      }

      // TODO(willbrazil): authorization
      const patch = await api.patch.getById(id);
      return patch || null;
    }
  },

  Mutation: {
    updatePatch: async (_, { input }, { api }) => {
      const selectedPatch = await api.patch.getById(input.id);
      if (!selectedPatch) {
        return null;
      }

      if (!input.bleId) {
        return { patch: selectedPatch };
      }

      const patch = await api.patch.update(input.id, {
        ...selectedPatch,
        ble_id: input.bleId ? input.bleId : selectedPatch.ble_id
      });

      return {
        patch: patch
          ? {
              ...patch,
              bleId: patch.ble_id
            }
          : null
      };
    },

    createPatch: async (_, { input }, { api }) => {
      if (!input.bleId || !input.userId) {
        throw new UserInputError("Patch UUID and User ID must be provided.");
      }

      return {
        patch: await api.patch.create({
          ble_id: input.bleId,
          user_id: input.userId
        })
      };
    },

    createReading: async (_, { input }, { api, auth }) => {
      if (!auth) {
        throw new AuthenticationError("Not authorized.");
      }

      if (!input.uri) {
        throw new UserInputError("URI must be provided.");
      }

      if (!input.firmwareVersion) {
        throw new UserInputError("firmwareVersion must be provided.");
      }

      if (!input.sequence) {
        throw new UserInputError("sequence must be provided.");
      }

      if (!input.uptimeMs) {
        throw new UserInputError("uptimeMs must be provided.");
      }

      if (!input.patchId && !input.patchBleId) {
        throw new UserInputError("Patch ID or Patch BLE ID must be provided.");
      }

      const readingInput = {
        patchId: input.patchId,
        uri: input.uri,
        firmwareVersion: input.firmwareVersion,
        sequence: input.sequence,
        uptimeMs: input.uptimeMs
      };

      let reading = null;

      if (input.patchId) {
        reading = await api.patch.insertReading({
          ...readingInput,
          patchId: input.patchId
        });
      }

      if (!input.patchId && input.patchBleId) {
        const patch = await api.patch.getByBleId(input.patchBleId);

        // If patch does not exist, create.
        if (!patch) {
          const newPatch = await api.patch.create({
            user_id: auth.id,
            ble_id: input.patchBleId
          });

          if (!newPatch) {
            throw new Error("Failed to create new patch for reading.");
          }
          reading = await api.patch.insertReading({
            ...readingInput,
            patchId: newPatch.id
          });
        } else {
          reading = await api.patch.insertReading({
            ...readingInput,
            patchId: patch.id
          });
        }
      }

      if (!reading) {
        return { reading: null };
      }

      let tags: string[] = [];
      if (input.tags && input.tags.length > 0) {
        tags = await api.patch
          .createReadingTags(reading.id, input.tags)
          .then(tags => tags.map(tag => tag.value));
      }

      return {
        reading: {
          ...reading,
          createdAt: reading.created_at,
          firmwareVersion: reading.firmware_version,
          sequence: reading.sequence,
          uptimeMs: reading.uptime_ms,
          tags
        }
      };
    }
  },

  Patch: {
    battery: async ({ id }, _, { api }) => {
      if (id) {
        const batteryInfo = await api.patch.getBatteryValue(id);
        if (batteryInfo) {
          return {
            value: batteryInfo.value,
            createdAt: batteryInfo.created_at
          };
        }
      }

      return null;
    },

    batteryActivity: async ({ id }, _, { api }) => {
      if (id) {
        const batteryActivity = await api.patch.listBatteryValue(id);
        if (batteryActivity) {
          return batteryActivity.map(batteryInfo => {
            return {
              value: batteryInfo.value,
              createdAt: batteryInfo.created_at
            };
          });
        }
      }

      return null;
    },

    firmwareVersion: async () => {
      return "v0.0.1";
    },

    appVersion: async () => {
      return "v1.0.0";
    },

    mobileDevice: async () => {
      return "Pixel XL";
    },

    readingCount: async ({ id }, _, { api }) => {
      if (id) {
        const readings = await api.patch.listReadings(id);
        return readings.length;
      }
      return 0;
    },

    readings: async ({ id }, _, { api }) => {
      if (id) {
        return api.patch.listReadings(id);
      }
      return [];
    }
  },

  Query: {
    readings: async (_, args, { api }) => {
      if (args.start) {
        const readings = await api.patch.listReadingsByTimeRange(
          args.patchId,
          new Date(args.start)
        );

        return Promise.all(
          readings.map(async reading => {
            return {
              ...reading,
              tags: await api.patch
                .getReadingTags(reading.id)
                .then(tags => tags.map(tag => tag.value))
            };
          })
        );
      } else {
        return [];
      }
    }
  }
};

export default resolvers;
