import { createTestClient } from "apollo-server-testing";
import { createMockServer, MockApi } from "../../testing";
import gql from "graphql-tag";

const GET_PATCHES = gql`
  query GetPatches {
    viewer {
      patches {
        uuid
      }
    }
  }
`;

describe("resolvers", () => {
  it("should return authenticated user", async () => {
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
      query: GET_PATCHES
    });

    expect(api.patch!.getPatchesByUserId!).toHaveBeenCalledWith(userId);
    expect(data).toEqual({ viewer: { patches: expectedPatches } });
  });
});
