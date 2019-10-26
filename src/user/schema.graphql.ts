import gql from "graphql-tag";

export default gql`
  type User {
    id: Int!
    username: String!
    firstName: String
    lastName: String
  }

  extend type Query {
    user(id: Int, username: String): User
  }
`;
