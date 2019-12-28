import { createTestClient } from "apollo-server-testing";
import { createMockServer, MockApi } from "../../testing";
import gql from "graphql-tag";
import { GraphQLError } from "graphql";

const MUTATION_CREATE_PATCH = gql`
  mutation CreatePatch($input: CreatePatchInput!) {
    createPatch(input: $input) {
      patch {
        id
        bleId
      }
    }
  }
`;

describe("resolvers", () => {
  describe("createPatch", () => {
    it("should create patch", async () => {
      const patchId = 1;
      const userId = 7;
      const bleId = "some-ble-id";

      const api: MockApi = {
        patch: {
          create: jest.fn().mockImplementation(async input => {
            return {
              id: patchId,
              bleId: input.ble_id
            };
          })
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_PATCH,
        variables: {
          input: {
            userId: userId,
            bleId
          }
        }
      });

      expect(response.data).toEqual({
        createPatch: { patch: { bleId: bleId, id: patchId } }
      });

      expect(api.patch!.create).toHaveBeenCalledWith({
        ble_id: bleId,
        user_id: userId
      });
    });

    it("should throw UserInputError when `bleId` is not provided", async () => {
      const userId = 7;

      const api: MockApi = {
        patch: {
          create: jest.fn()
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_PATCH,
        variables: {
          input: {
            userId
          }
        }
      });

      expect(response.data!.createPatch).toBeNull();
      expect(response.errors).toEqual(
        expect.arrayContaining([expect.any(GraphQLError)])
      );

      expect(api.patch!.create).not.toHaveBeenCalled();
    });

    it("should throw UserInputError when `userId` is not provided", async () => {
      const bleId = "some-ble-id";

      const api: MockApi = {
        patch: {
          create: jest.fn()
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_PATCH,
        variables: {
          input: {
            bleId
          }
        }
      });

      expect(response.data!.createPatch).toBeNull();
      expect(response.errors).toEqual(
        expect.arrayContaining([expect.any(GraphQLError)])
      );

      expect(api.patch!.create).not.toHaveBeenCalled();
    });

    it("should throw UserInputError when input values are not provided", async () => {
      const api: MockApi = {
        patch: {
          create: jest.fn()
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_PATCH,
        variables: {
          input: {
            /* input not provided */
          }
        }
      });

      expect(response.data!.createPatch).toBeNull();
      expect(response.errors).toEqual(
        expect.arrayContaining([expect.any(GraphQLError)])
      );

      expect(api.patch!.create).not.toHaveBeenCalled();
    });

    it("should return internal server error if api throws.", async () => {
      const userId = 1;
      const bleId = "some-ble-id";

      const api: MockApi = {
        patch: {
          create: jest.fn().mockImplementation(async () => {
            throw new Error("some-api-error");
          })
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_PATCH,
        variables: {
          input: {
            userId,
            bleId
          }
        }
      });

      expect(response.data!.createPatch).toBeNull();
      expect(response.errors).toEqual(
        expect.arrayContaining([expect.any(GraphQLError)])
      );

      expect(api.patch!.create).toHaveBeenCalledWith({
        ble_id: bleId,
        user_id: userId
      });
    });
  });

  describe.skip("getPatch", () => {});

  describe.skip("listPatches", () => {});

  describe.skip("updatePatch", () => {});

  describe.skip("deletePatch", () => {});
});
