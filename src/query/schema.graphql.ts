import gql from "graphql-tag";

export default gql`
  type Query {
    version: String
  }

  type Mutation {
    version: String
  }
`;
