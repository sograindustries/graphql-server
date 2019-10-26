import gql from "graphql-tag";

export default gql`
  type Patch {
    id: Int!
    uuid: String!
    data: [Int!]!
  }

  extend type User {
    patches: [Patch!]!
  }
`;
