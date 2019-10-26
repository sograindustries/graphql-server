import { createTestClient } from "apollo-server-testing";
import { createMockServer, MockApi } from "../../testing";
import gql from "graphql-tag";

const GET_PATCHES_QUERY = gql`
  query GetPatches {
    viewer {
      patches {
        uuid
      }
    }
  }
`;

const UPDATE_PATCH_MUTATION = gql`
  mutation UpdatePatch($input: UpdatePatchInput!) {
    updatePatch(input: $input) {
      patch {
        uuid
      }
    }
  }
`;

const CREATE_PATCH_MUTATION = gql`
  mutation CreatePatch($input: CreatePatchInput!) {
    createPatch(input: $input) {
      patch {
        id
        uuid
      }
    }
  }
`;

describe("resolvers", () => {
  describe("Query", () => {
    it("should return user patches.", async () => {
      const userId = 1;
      const expectedPatches = [{ uuid: "some-uuid" }];

      const api: MockApi = {
        patch: {
          getPatchesByUserId: jest.fn().mockResolvedValue(expectedPatches)
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
      expect(data).toEqual({ viewer: { patches: expectedPatches } });
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
            .mockResolvedValue({ uuid: "current-uuid", user_id: userId }),
          update: jest.fn().mockResolvedValue({ uuid: "new-uuid" })
        }
      };
      const { mutate } = createTestClient(
        createMockServer({} /* context */, api)
      );

      const { data } = await mutate({
        mutation: UPDATE_PATCH_MUTATION,
        variables: { input: { id: patchId, uuid: "new-uuid" } }
      });

      expect(api.patch!.update!).toHaveBeenCalledWith(patchId, {
        uuid: "new-uuid",
        user_id: userId
      });
      expect(api.patch!.getById!).toHaveBeenCalledWith(patchId);

      expect(data).toEqual({
        updatePatch: { patch: { uuid: "new-uuid" } }
      });
    });

    it("should not update patch if UUID is not present.", async () => {
      const userId = 1;
      const patchId = 7;
      const api: MockApi = {
        patch: {
          getById: jest
            .fn()
            .mockResolvedValue({ uuid: "old-uuid", user_id: userId }),
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
        updatePatch: { patch: { uuid: "old-uuid" } }
      });
    });

    it("should create patch", async () => {
      const expectedPatch = { id: 1, uuid: "new-uuid", user_id: 7 };
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
          input: { uuid: expectedPatch.uuid, userId: expectedPatch.user_id }
        }
      });

      expect(api.patch!.create!).toHaveBeenCalledWith({
        uuid: expectedPatch.uuid,
        user_id: expectedPatch.user_id
      });

      expect(data).toEqual({
        createPatch: {
          patch: { id: expectedPatch.id, uuid: expectedPatch.uuid }
        }
      });
    });
  });
});
