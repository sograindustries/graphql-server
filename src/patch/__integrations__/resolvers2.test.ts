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

const GET_READINGS_BY_TIME_QUERY = gql`
  query GetReadingsByTimeRange($patchId: Int!, $start: String) {
    readings(patchId: $patchId, start: $start) {
      id
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

const CREATE_READING_MUTATION = gql`
  mutation CreateReading($input: CreateReadingInput!) {
    createReading(input: $input) {
      reading {
        id
        tags
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

    it("should return readings after start time.", async () => {
      const api: MockApi = {
        patch: {
          listReadingsByTimeRange: jest
            .fn()
            .mockResolvedValue([{ ble_id: "some-bleId" }])
        }
      };
      const { query } = createTestClient(createMockServer({}, api));

      await query({
        query: GET_READINGS_BY_TIME_QUERY,
        variables: {
          patchId: 1,
          start: "2019-11-09 23:16:39"
        }
      });

      expect(api.patch!.listReadingsByTimeRange!).toHaveBeenCalledWith(
        1,
        new Date("2019-11-09 23:16:39")
      );
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

    it("should create reading", async () => {
      const readingId = 1;
      const expectedTags = ["tag-1", "tag-2"];
      const expectedReading = {
        patchId: 7,
        uri: "some-uri",
        firmwareVersion: "f",
        sequence: 9,
        uptimeMs: 100
      };

      const api: MockApi = {
        patch: {
          insertReading: jest
            .fn()
            .mockResolvedValue({ id: readingId, ...expectedReading }),
          createReadingTags: jest
            .fn()
            .mockResolvedValue([{ value: "tag-1" }, { value: "tag-2" }])
        }
      };
      const { mutate } = createTestClient(
        createMockServer(
          { auth: { id: 1, username: "user", jwt: "jwt" } } /* context */,
          api
        )
      );

      const { data } = await mutate({
        mutation: CREATE_READING_MUTATION,
        variables: {
          input: { ...expectedReading, tags: expectedTags }
        }
      });

      expect(api.patch!.insertReading).toHaveBeenCalledWith(expectedReading);
      expect(api.patch!.createReadingTags).toHaveBeenCalledWith(
        readingId,
        expectedTags
      );
      expect(data).toEqual({
        createReading: {
          reading: {
            id: readingId,
            tags: expectedTags
          }
        }
      });
    });
  });
});
