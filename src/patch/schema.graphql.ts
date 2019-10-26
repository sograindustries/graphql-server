import gql from "graphql-tag";

export default gql`
  type Patch {
    id: Int!
    uuid: String!
  }

  extend type User {
    patches: [Patch!]!
  }

  "Creates a patch."
  input CreatePatchInput {
    uuid: String
    userId: Int
  }

  type CreatePatchPayload {
    "The patch created."
    patch: Patch
  }

  "Updates patch of provided ID."
  input UpdatePatchInput {
    id: Int!
    uuid: String
  }

  type UpdatePatchPayload {
    "The patch updated."
    patch: Patch
  }

  extend type Mutation {
    updatePatch(input: UpdatePatchInput!): UpdatePatchPayload
    createPatch(input: CreatePatchInput!): CreatePatchPayload
  }
`;
