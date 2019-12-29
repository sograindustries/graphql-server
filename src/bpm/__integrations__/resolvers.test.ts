import { createTestClient } from "apollo-server-testing";
import { createMockServer, MockApi } from "../../testing";
import gql from "graphql-tag";

const QUERY_GET_USER_BPM = gql`
  query GetBpm($id: Int) {
    user(id: $id) {
      bpm {
        value
      }
    }
  }
`;

const MUTATION_CREATE_BPM = gql`
  mutation CreateBpm($input: CreateBpmInput!) {
    createBpm(input: $input) {
      value
    }
  }
`;

describe("resolvers", () => {
  describe("get user bpm", () => {
    it("should return user's BPM array.", async () => {
      const userId = 7;

      const api: MockApi = {
        bpm: {
          list: jest.fn().mockResolvedValue([{ value: 1 }, { value: 2 }])
        },

        user: {
          getUserById: jest.fn().mockResolvedValue({ id: userId })
        }
      };

      const { query } = createTestClient(createMockServer({}, api));

      const response = await query({
        query: QUERY_GET_USER_BPM,
        variables: {
          id: userId
        }
      });

      expect(response.data!.user!.bpm).toEqual([{ value: 1 }, { value: 2 }]);
      expect(api.bpm!.list).toHaveBeenCalledWith(userId);
    });
  });

  describe("createPatch", () => {
    it("should create bpm entry", async () => {
      const userId = 7;
      const bpmValue = 80;

      const api: MockApi = {
        bpm: {
          create: jest.fn().mockImplementation(async (_, value) => {
            return {
              value
            };
          })
        }
      };

      const { mutate } = createTestClient(createMockServer({}, api));

      const response = await mutate({
        mutation: MUTATION_CREATE_BPM,
        variables: {
          input: {
            userId: userId,
            value: bpmValue
          }
        }
      });

      expect(response.data).toEqual({
        createBpm: { value: bpmValue }
      });

      expect(api.bpm!.create).toHaveBeenCalledWith(userId, bpmValue);
    });
  });
});
