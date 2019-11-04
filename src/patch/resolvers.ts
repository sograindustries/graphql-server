import { Resolvers } from "../generated/graphql";
import { UserInputError, AuthenticationError } from "apollo-server-core";

const resolvers: Resolvers = {
  User: {
    patches: async (user, __, { auth, api }) => {
      if (!auth || !user.id) {
        return [];
      }

      return api.patch.getPatchesByUserId(user.id);
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
        throw new UserInputError("URI and must be provided.");
      }

      if (!input.patchId && !input.patchBleId) {
        throw new UserInputError("Patch ID or Patch BLE ID must be provided.");
      }

      let reading = null;

      if (input.patchId) {
        reading = await api.patch.insertReading(input.patchId, input.uri);
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

          reading = await api.patch.insertReading(newPatch.id, input.uri);
        }
      }

      return {
        reading: reading
          ? {
              ...reading,
              createdAt: reading.created_at
            }
          : null
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
  }
};

export default resolvers;
