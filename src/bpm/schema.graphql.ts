import gql from "graphql-tag";

export default gql`
  type Bpm {
    value: Int
    createdAt: String
  }

  type User {
    bpm: [Bpm!]
  }

  "Creates a reading for a given patch."
  input CreateBpmInput {
    userId: Int
    value: Int
  }

  type CreateBpmPayoad {
    value: Int
  }

  extend type Mutation {
    createBpm(input: CreateBpmInput!): CreateBpmPayoad
  }
`;
