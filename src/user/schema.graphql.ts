import gql from "graphql-tag";

export default gql`
  type User {
    id: String!
    username: String!
    firstName: String
    lastName: String
  }

  extend type Query {
    user(id: String, username: String): User
  }
`;
