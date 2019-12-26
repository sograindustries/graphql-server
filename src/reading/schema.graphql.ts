import gql from "graphql-tag";

export default gql`
  extend type User {
    readings(startUnix: Int): [Reading!]
  }
`;
