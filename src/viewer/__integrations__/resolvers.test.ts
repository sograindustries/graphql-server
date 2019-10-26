import { createTestClient } from "apollo-server-testing";
import { createMockServer } from "../../testing";
import gql from "graphql-tag";

const GET_VIEWER = gql`
  query GetViwer {
    viewer {
      id
    }
  }
`;

describe("resolvers", () => {
  it("should return authenticated user", async () => {
    const { query } = createTestClient(
      createMockServer(
        { auth: { username: "some-id", jwt: "" } },
        {
          user: {
            get: async id => ({ id } as any)
          }
        }
      )
    );

    const { data } = await query({
      query: GET_VIEWER
    });

    //expect(errors).toBeNull();
    expect(data).toEqual({ viewer: { id: "some-id" } });
  });
});
