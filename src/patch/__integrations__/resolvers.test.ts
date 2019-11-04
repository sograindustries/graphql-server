import { createTestClient } from "apollo-server-testing";
import { createMockServer, MockApi } from "../../testing";
import gql from "graphql-tag";

const GET_PATCHES_QUERY = gql`
  query GetPatches {
    viewer {
      patches {
        bleId
      }
    }
  }
`;

const UPDATE_PATCH_MUTATION = gql`
  mutation UpdatePatch($input: UpdatePatchInput!) {
    updatePatch(input: $input) {
      patch {
        bleId
      }
    }
  }
`;

const CREATE_PATCH_MUTATION = gql`
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
  describe("Query", () => {
    it("should return user patches.", async () => {
      const userId = 1;

      const api: MockApi = {
        patch: {
          getPatchesByUserId: jest
            .fn()
            .mockResolvedValue([{ ble_id: "some-bleId" }])
        },
        user: {
          getUserById: jest
            .fn()
            .mockResolvedValue({ id: userId, username: "some-username" })
        }
      };
      const { query } = createTestClient(
        createMockServer(
          { auth: { id: userId, username: "some-id", jwt: "" } },
          api
        )
      );

      const { data } = await query({
        query: GET_PATCHES_QUERY
      });

      expect(api.patch!.getPatchesByUserId!).toHaveBeenCalledWith(userId);
      expect(data).toEqual({ viewer: { patches: [{ bleId: "some-bleId" }] } });
    });
  });

  describe("Mutation", () => {
    it("should update patch", async () => {
      const userId = 1;
      const patchId = 7;
      const api: MockApi = {
        patch: {
          getById: jest
            .fn()
            .mockResolvedValue({ ble_id: "current-bleId", user_id: userId }),
          update: jest.fn().mockResolvedValue({ ble_id: "new-bleId" })
        }
      };
      const { mutate } = createTestClient(
        createMockServer({} /* context */, api)
      );

      const { data } = await mutate({
        mutation: UPDATE_PATCH_MUTATION,
        variables: { input: { id: patchId, bleId: "new-bleId" } }
      });

      expect(api.patch!.update!).toHaveBeenCalledWith(patchId, {
        ble_id: "new-bleId",
        user_id: userId
      });
      expect(api.patch!.getById!).toHaveBeenCalledWith(patchId);

      expect(data).toEqual({
        updatePatch: { patch: { bleId: "new-bleId" } }
      });
    });

    it("should not update patch if bleId is not present.", async () => {
      const userId = 1;
      const patchId = 7;
      const api: MockApi = {
        patch: {
          getById: jest
            .fn()
            .mockResolvedValue({ bleId: "old-bleId", user_id: userId }),
          update: jest.fn()
        }
      };
      const { mutate } = createTestClient(
        createMockServer({} /* context */, api)
      );

      const { data } = await mutate({
        mutation: UPDATE_PATCH_MUTATION,
        variables: { input: { id: patchId } }
      });

      expect(api.patch!.update!).not.toHaveBeenCalled();
      expect(api.patch!.getById!).toHaveBeenCalledWith(patchId);

      expect(data).toEqual({
        updatePatch: { patch: { bleId: "old-bleId" } }
      });
    });

    it("should create patch", async () => {
      const expectedPatch = { id: 1, bleId: "new-bleId", user_id: 7 };
      const api: MockApi = {
        patch: {
          create: jest.fn().mockResolvedValue(expectedPatch)
        }
      };
      const { mutate } = createTestClient(
        createMockServer({} /* context */, api)
      );

      const { data } = await mutate({
        mutation: CREATE_PATCH_MUTATION,
        variables: {
          input: { bleId: expectedPatch.bleId, userId: expectedPatch.user_id }
        }
      });

      expect(api.patch!.create!).toHaveBeenCalledWith({
        ble_id: expectedPatch.bleId,
        user_id: expectedPatch.user_id
      });

      expect(data).toEqual({
        createPatch: {
          patch: { id: expectedPatch.id, bleId: expectedPatch.bleId }
        }
      });
    });
  });
});
